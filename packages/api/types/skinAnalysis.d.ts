export interface SkinConcern {
    id: string;
    name: string;
    description?: string;
    recommendedProducts?: string[];
    recommendedServices?: string[];
}
export interface SkinType {
    id: string;
    name: 'dry' | 'oily' | 'combination' | 'normal' | 'sensitive';
    description?: string;
}
export interface SkinAnalysisResult {
    id: string;
    userId: string;
    imageUrl: string;
    skinType: SkinType;
    concerns: SkinConcern[];
    recommendations: {
        products?: {
            id: string;
            name: string;
            description?: string;
            imageUrl?: string;
            price?: number;
        }[];
        services?: {
            id: string;
            name: string;
            description?: string;
        }[];
        routine?: {
            morning?: string[];
            evening?: string[];
        };
    };
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=skinAnalysis.d.ts.map