interface MockData {
  supabase: {
    functions: {
      invoke: () => Promise<{
        data: {
          hydration: number;
          elasticity: number;
          recommendedProducts: string[];
        } | null;
        error: any | null;
      }>;
    };
  };
}

declare global {
  interface Window {
    mockData?: MockData;
  }
}

export {}; 