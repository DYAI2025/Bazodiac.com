// Bazodiac API Services - BaziEngine & Gemini
import axios from 'axios';
import config from '../config';

const baziEngine = axios.create({
    baseURL: config.baziEngine.url,
    timeout: 10000,
});

const geminiProxy = axios.create({
    baseURL: '/api',
    timeout: 30000,
});

// ============================================
// BaziEngine API
// ============================================

export const baziEngineApi = {
    /**
     * Generate astrological symbol based on birth data
     */
    async generateSymbol(birthData: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        timezone: string;
        latitude?: number;
        longitude?: number;
    }): Promise<{ svg: string; metadata: Record<string, unknown> }> {
        const response = await baziEngine.post('/api/symbol', birthData);
        return response.data;
    },

    /**
     * Get full astrological analysis
     */
    async getAnalysis(birthData: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        timezone: string;
    }): Promise<Record<string, unknown>> {
        const response = await baziEngine.post('/api/analysis', birthData);
        return response.data;
    },

    /**
     * Get transit data for current date
     */
    async getTransits(birthData: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        timezone: string;
    }): Promise<Record<string, unknown>> {
        const response = await baziEngine.post('/api/transits', birthData);
        return response.data;
    },
};

// ============================================
// Gemini API (via local proxy)
// ============================================

export const geminiApi = {
    /**
     * Generate symbol description or enhancement using Gemini
     */
    async generateSymbolDescription(prompt: string): Promise<string> {
        const response = await geminiProxy.post('/symbol', {
            prompt,
            model: 'gemini-2.0-flash-exp',
        });
        return response.data.description;
    },

    /**
     * Generate enhanced analysis text
     */
    async enhanceAnalysis(analysis: Record<string, unknown>): Promise<string> {
        const response = await geminiProxy.post('/analysis', {
            analysis,
            model: 'gemini-2.0-flash-exp',
        });
        return response.data.enhanced;
    },
};

// ============================================
// Fusion Engine (combines BaZi + Astrology)
// ============================================

export interface FusionInput {
    birthData: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        timezone: string;
        latitude?: number;
        longitude?: number;
    };
}

export interface FusionResult {
    baziData: Record<string, unknown>;
    astrologyData: Record<string, unknown>;
    fusionScore: number;
    symbol: string;
    analysis: string;
    recommendations: string[];
}

export const fusionEngine = {
    /**
     * Combine BaZi and Western Astrology into unified reading
     */
    async fuse(input: FusionInput): Promise<FusionResult> {
        const [baziResult, astrologyResult] = await Promise.all([
            baziEngineApi.getAnalysis(input.birthData),
            baziEngineApi.getAnalysis({
                ...input.birthData,
                // Add western astrology specific calculations if needed
            }),
        ]);

        // Get symbol from BaziEngine
        const symbolResult = await baziEngineApi.generateSymbol(input.birthData);

        // Enhance with Gemini
        const enhancedAnalysis = await geminiApi.enhanceAnalysis({
            bazi: baziResult,
            astrology: astrologyResult,
        });

        // Calculate fusion score (simplified - would be more complex in production)
        const fusionScore = calculateFusionScore(baziResult, astrologyResult);

        // Generate recommendations
        const recommendations = generateRecommendations(baziResult, astrologyResult);

        return {
            baziData: baziResult as Record<string, unknown>,
            astrologyData: astrologyResult as Record<string, unknown>,
            fusionScore,
            symbol: symbolResult.svg,
            analysis: enhancedAnalysis,
            recommendations,
        };
    },
};

// Helper functions (simplified implementations)
function calculateFusionScore(bazi: Record<string, unknown>, astrology: Record<string, unknown>): number {
    // In production, this would be a sophisticated algorithm
    // combining elements, aspects, and derived characteristics
    return 0.85; // Placeholder
}

function generateRecommendations(bazi: Record<string, unknown>, astrology: Record<string, unknown>): string[] {
    // Generate personalized recommendations based on analysis
    return [
        'Focus on your strengths this month',
        'Communication is key in your relationships',
        'Take time for self-reflection',
    ];
}

export default {
    baziEngine: baziEngineApi,
    gemini: geminiApi,
    fusion: fusionEngine,
};
