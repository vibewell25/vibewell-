import { SkinAnalysisResult } from '../types';
export declare const getSkinAnalysis: (userId: string) => Promise<SkinAnalysisResult | null>;
export declare const submitSkinAnalysis: (userId: string, imageUrl: string) => Promise<{
    id: string;
} | null>;
//# sourceMappingURL=skinAnalysis.d.ts.map