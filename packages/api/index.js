import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
// Initialize Supabase client
export const createSupabaseClient = (supabaseUrl, supabaseKey) => {
    return createClient(supabaseUrl, supabaseKey);
};
// Create a default Supabase client for tests and storybook
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
export const supabase = createClient(supabaseUrl, supabaseKey);
// Default export
export default {
    createSupabaseClient,
    supabase,
};
// Initialize Prisma client (singleton to prevent too many connections)
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
}
else {
    // In development, create a single instance to reuse
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}
export { prisma };
// Export supabase helpers
export * from './supabase';
export * from './supabaseClient';
// Export API endpoints
export * from './endpoints';
// Export API types
export * from './types';
//# sourceMappingURL=index.js.map