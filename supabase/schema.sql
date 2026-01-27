-- Bazodiac Unified Platform - Supabase Schema
-- Stand: 2026-01-27

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

-- Anonymous users (for try-out without login)
CREATE TABLE IF NOT EXISTS anonymous_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- User preferences
    language TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'UTC',
    
    -- Subscription / Premium status
    is_premium BOOLEAN DEFAULT FALSE,
    premium_until TIMESTAMPTZ,
    token_balance INTEGER DEFAULT 0,
    
    -- Character state (gamification)
    character_level INTEGER DEFAULT 1,
    character_xp INTEGER DEFAULT 0,
    character_stats JSONB DEFAULT '{
        "confidence": 50,
        "social": 50,
        "creativity": 50,
        "focus": 50
    }',
    
    -- Onboarding state
    onboarding_completed BOOLEAN DEFAULT FALSE,
    current_step TEXT DEFAULT 'birth_data',
    
    -- Last interactions
    last_agent_id TEXT,
    last_chart_id UUID
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone."
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile."
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- ============================================
-- ASTROLOGY DATA
-- ============================================

-- Birth data records (input for calculations)
CREATE TABLE IF NOT EXISTS birth_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    anonymous_user_id UUID REFERENCES anonymous_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Core birth information
    birth_date DATE NOT NULL,
    birth_time TIME NOT NULL,
    birth_timezone TEXT NOT NULL,
    birth_latitude DECIMAL(10, 8),
    birth_longitude DECIMAL(11, 8),
    birth_place TEXT,
    
    -- Name (optional, for personalization)
    name TEXT,
    
    -- Metadata
    is_private BOOLEAN DEFAULT TRUE
);

-- Charts (calculated astrological analyses)
CREATE TABLE IF NOT EXISTS charts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    anonymous_user_id UUID REFERENCES anonymous_users(id) ON DELETE SET NULL,
    birth_data_id UUID REFERENCES birth_data(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Analysis results (cached)
    analysis_json JSONB NOT NULL,
    symbol_svg TEXT,
    symbol_metadata JSONB,
    
    -- Fusion result (BaZi + Astrology combined)
    fusion_result JSONB,
    
    -- Engine used for calculation
    engine_source TEXT DEFAULT 'baziengine', -- 'baziengine', 'local', 'fallback'
    calculation_duration_ms INTEGER,
    
    -- Visibility
    is_public BOOLEAN DEFAULT FALSE,
    share_token TEXT UNIQUE
);

-- Charts RLS
ALTER TABLE charts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own charts."
    ON charts FOR SELECT
    USING (
        user_id = auth.uid() OR 
        anonymous_user_id IN (SELECT id FROM anonymous_users)
    );

CREATE POLICY "Users can create charts."
    ON charts FOR INSERT
    WITH CHECK (
        user_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM anonymous_users WHERE id = anonymous_user_id)
    );

-- ============================================
-- AGENT INTERACTIONS
-- ============================================

-- Agent sessions (conversations with Levi/Victoria)
CREATE TABLE IF NOT EXISTS agent_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    anonymous_user_id UUID REFERENCES anonymous_users(id) ON DELETE SET NULL,
    chart_id UUID REFERENCES charts(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Agent identification
    agent_id TEXT NOT NULL, -- 'levi', 'victoria'
    agent_name TEXT,
    
    -- Session state
    is_active BOOLEAN DEFAULT TRUE,
    messages_count INTEGER DEFAULT 0,
    tokens_used INTEGER DEFAULT 0,
    
    -- ElevenLabs specific
    elevenlabs_session_id TEXT,
    elevenlabs_conversation_id TEXT
);

-- Session messages
CREATE TABLE IF NOT EXISTS agent_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES agent_sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Message content
    role TEXT NOT NULL, -- 'user', 'assistant', 'system'
    content TEXT NOT NULL,
    
    -- Audio (if voice)
    audio_url TEXT,
    audio_duration_sec DECIMAL(6, 2),
    
    -- Token usage
    input_tokens INTEGER,
    output_tokens INTEGER
);

-- Agent Sessions RLS
ALTER TABLE agent_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions."
    ON agent_sessions FOR SELECT
    USING (
        user_id = auth.uid() OR 
        anonymous_user_id IN (SELECT id FROM anonymous_users)
    );

CREATE POLICY "Users can create sessions."
    ON agent_sessions FOR INSERT
    WITH CHECK (
        user_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM anonymous_users WHERE id = anonymous_user_id)
    );

-- ============================================
-- QUIZZES & GAMIFICATION
-- ============================================

-- Quiz results (personality tests)
CREATE TABLE IF NOT EXISTS quiz_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    anonymous_user_id UUID REFERENCES anonymous_users(id) ON DELETE SET NULL,
    chart_id UUID REFERENCES charts(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    quiz_type TEXT NOT NULL, -- 'attachment_style', 'social_battery', 'confidence', etc.
    quiz_result JSONB NOT NULL,
    quiz_score DECIMAL(5, 2),
    
    -- How it affected character stats
    stat_changes JSONB DEFAULT '{}'
);

-- ============================================
-- ANALYTICS & TRACKING (Privacy-first)
-- ============================================

-- Aggregated analytics (no PII)
CREATE TABLE IF NOT EXISTS analytics_daily (
    date DATE PRIMARY KEY,
    
    -- Counts (anonymized)
    total_visits INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    completed_onboardings INTEGER DEFAULT 0,
    agent_conversations INTEGER DEFAULT 0,
    premium_conversions INTEGER DEFAULT 0,
    
    -- Revenue (aggregated)
    revenue_cents INTEGER DEFAULT 0,
    token_purchases INTEGER DEFAULT 0
);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_charts_updated_at
    BEFORE UPDATE ON charts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_agent_sessions_updated_at
    BEFORE UPDATE ON agent_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- INDEXES (Performance)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_charts_user_id ON charts(user_id);
CREATE INDEX IF NOT EXISTS idx_charts_created_at ON charts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_sessions_user_id ON agent_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_sessions_chart_id ON agent_sessions(chart_id);
CREATE INDEX IF NOT EXISTS idx_birth_data_user_id ON birth_data(user_id);

-- ============================================
-- VIEWS (Common Queries)
-- ============================================

-- User dashboard view
CREATE OR REPLACE VIEW user_dashboard AS
SELECT 
    p.id as user_id,
    p.language,
    p.is_premium,
    p.token_balance,
    p.character_level,
    p.character_stats,
    COUNT(c.id) as total_charts,
    COUNT(DISTINCT s.id) as total_agent_sessions,
    MAX(c.created_at) as last_chart_date,
    MAX(s.updated_at) as last_conversation_date
FROM profiles p
LEFT JOIN charts c ON p.id = c.user_id
LEFT JOIN agent_sessions s ON p.id = s.user_id AND s.is_active = TRUE
GROUP BY p.id;

-- Chart with birth data view
CREATE OR REPLACE VIEW charts_with_birthdata AS
SELECT 
    c.*,
    b.birth_date,
    b.birth_time,
    b.birth_place,
    b.name
FROM charts c
LEFT JOIN birth_data b ON c.birth_data_id = b.id;
