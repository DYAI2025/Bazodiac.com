// Bazodiac Shared Services - Supabase Client
// Single Supabase client for all apps

import { createClient } from '@supabase/supabase-js';
import config from '../config';

export const supabase = createClient(
    config.supabase.url,
    config.supabase.anonKey,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
        },
    }
);

// Helper functions for common operations
export const supabaseHelpers = {
    // User
    async getUser(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        return { data, error };
    },

    async updateUser(userId: string, updates: Record<string, unknown>) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();
        return { data, error };
    },

    // Charts
    async createChart(chartData: Record<string, unknown>) {
        const { data, error } = await supabase
            .from('charts')
            .insert(chartData)
            .select()
            .single();
        return { data, error };
    },

    async getCharts(userId: string) {
        const { data, error } = await supabase
            .from('charts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    async getChart(chartId: string) {
        const { data, error } = await supabase
            .from('charts')
            .select('*, birth_data(*)')
            .eq('id', chartId)
            .single();
        return { data, error };
    },

    // Agent Sessions
    async createSession(sessionData: Record<string, unknown>) {
        const { data, error } = await supabase
            .from('agent_sessions')
            .insert(sessionData)
            .select()
            .single();
        return { data, error };
    },

    async getSessions(userId: string) {
        const { data, error } = await supabase
            .from('agent_sessions')
            .select('*')
            .eq('user_id', userId)
            .eq('is_active', true)
            .order('updated_at', { ascending: false });
        return { data, error };
    },

    async addMessage(sessionId: string, message: { role: string; content: string }) {
        const { data, error } = await supabase
            .from('agent_messages')
            .insert({
                session_id: sessionId,
                ...message,
            })
            .select()
            .single();
        return { data, error };
    },

    async getMessages(sessionId: string) {
        const { data, error } = await supabase
            .from('agent_messages')
            .select('*')
            .eq('session_id', sessionId)
            .order('created_at', { ascending: true });
        return { data, error };
    },

    // Birth Data
    async saveBirthData(birthData: Record<string, unknown>) {
        const { data, error } = await supabase
            .from('birth_data')
            .insert(birthData)
            .select()
            .single();
        return { data, error };
    },

    async getBirthData(userId: string) {
        const { data, error } = await supabase
            .from('birth_data')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data, error };
    },
};

export default supabase;
