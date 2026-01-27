// Bazodiac Unified - Shared Configuration
// Environment variables with type safety

interface BazodiacConfig {
    supabase: {
        url: string;
        anonKey: string;
        serviceRoleKey: string;
    };
    elevenlabs: {
        apiKey: string;
        toolSecret: string;
        webhookSecret: string;
        leviAgentId: string;
        victoriaAgentId: string;
    };
    gemini: {
        apiKey: string;
    };
    baziEngine: {
        url: string;
    };
    app: {
        name: string;
        version: string;
        environment: 'development' | 'production';
    };
}

// Load from environment (throw if missing in production)
function loadConfig(): BazodiacConfig {
    const isProduction = process.env.NODE_ENV === 'production';
    
    const getEnv = (key: string, required: boolean = false): string => {
        const value = process.env[key] || '';
        if (required && !value && isProduction) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        return value;
    };
    
    return {
        supabase: {
            url: getEnv('SUPABASE_URL', true),
            anonKey: getEnv('VITE_SUPABASE_ANON_KEY', true),
            serviceRoleKey: getEnv('SUPABASE_SERVICE_ROLE_KEY', true),
        },
        elevenlabs: {
            apiKey: getEnv('ELEVENLABS_API_KEY', true),
            toolSecret: getEnv('ELEVENLABS_TOOL_SECRET', false),
            webhookSecret: getEnv('ELEVENLABS_WEBHOOK_SECRET', false),
            leviAgentId: getEnv('VITE_ELEVENLABS_AGENT_ID_LEVI', true),
            victoriaAgentId: getEnv('VITE_ELEVENLABS_AGENT_ID_VICTORIA', true),
        },
        gemini: {
            apiKey: getEnv('GEMINI_API_KEY', true),
        },
        baziEngine: {
            url: getEnv('BAZI_ENGINE_URL', false) || 'https://baziengine-v2.fly.dev',
        },
        app: {
            name: 'Bazodiac',
            version: '1.0.0',
            environment: isProduction ? 'production' : 'development',
        },
    };
}

export const config = loadConfig();
export default config;
