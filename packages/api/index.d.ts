import { SupabaseClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
export declare const createSupabaseClient: (supabaseUrl: string, supabaseKey: string) => SupabaseClient<any, "public", any>;
export declare const supabase: SupabaseClient<any, "public", any>;
export type { SupabaseClient };
declare const _default: {
    createSupabaseClient: (supabaseUrl: string, supabaseKey: string) => SupabaseClient<any, "public", any>;
    supabase: SupabaseClient<any, "public", any>;
};
export default _default;
declare let prisma: PrismaClient;
export { prisma };
export * from './supabase';
export * from './supabaseClient';
export * from './endpoints';
export * from './types';
//# sourceMappingURL=index.d.ts.map