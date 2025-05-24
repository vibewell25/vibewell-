import { SupabaseClient } from '@supabase/supabase-js';
export declare const createClient: () => SupabaseClient;
export declare const signUp: (supabase: SupabaseClient, email: string, password: string, metadata?: Record<string, any>) => Promise<{
    data: {
        user: import("@supabase/supabase-js").AuthUser | null;
        session: import("@supabase/supabase-js").AuthSession | null;
    } | {
        user: null;
        session: null;
    };
    error: import("@supabase/supabase-js").AuthError | null;
}>;
export declare const signIn: (supabase: SupabaseClient, email: string, password: string) => Promise<{
    data: {
        user: import("@supabase/supabase-js").AuthUser;
        session: import("@supabase/supabase-js").AuthSession;
        weakPassword?: import("@supabase/supabase-js").WeakPassword;
    } | {
        user: null;
        session: null;
        weakPassword?: null;
    };
    error: import("@supabase/supabase-js").AuthError | null;
}>;
export declare const signOut: (supabase: SupabaseClient) => Promise<{
    error: import("@supabase/supabase-js").AuthError | null;
}>;
export declare const resetPassword: (supabase: SupabaseClient, email: string) => Promise<{
    data: {} | null;
    error: import("@supabase/supabase-js").AuthError | null;
}>;
export declare const getUser: (supabase: SupabaseClient) => Promise<{
    data: {
        user: import("@supabase/supabase-js").AuthUser;
    } | {
        user: null;
    };
    error: import("@supabase/supabase-js").AuthError | null;
}>;
export declare const updateUserProfile: (supabase: SupabaseClient, profile: Record<string, any>) => Promise<{
    error: Error;
    data?: undefined;
} | {
    data: any[] | null;
    error: import("@supabase/supabase-js").PostgrestError | null;
}>;
export declare const supabaseHelpers: {
    signUp: (supabase: SupabaseClient, email: string, password: string, metadata?: Record<string, any>) => Promise<{
        data: {
            user: import("@supabase/supabase-js").AuthUser | null;
            session: import("@supabase/supabase-js").AuthSession | null;
        } | {
            user: null;
            session: null;
        };
        error: import("@supabase/supabase-js").AuthError | null;
    }>;
    signIn: (supabase: SupabaseClient, email: string, password: string) => Promise<{
        data: {
            user: import("@supabase/supabase-js").AuthUser;
            session: import("@supabase/supabase-js").AuthSession;
            weakPassword?: import("@supabase/supabase-js").WeakPassword;
        } | {
            user: null;
            session: null;
            weakPassword?: null;
        };
        error: import("@supabase/supabase-js").AuthError | null;
    }>;
    signOut: (supabase: SupabaseClient) => Promise<{
        error: import("@supabase/supabase-js").AuthError | null;
    }>;
    resetPassword: (supabase: SupabaseClient, email: string) => Promise<{
        data: {} | null;
        error: import("@supabase/supabase-js").AuthError | null;
    }>;
    getUser: (supabase: SupabaseClient) => Promise<{
        data: {
            user: import("@supabase/supabase-js").AuthUser;
        } | {
            user: null;
        };
        error: import("@supabase/supabase-js").AuthError | null;
    }>;
    updateUserProfile: (supabase: SupabaseClient, profile: Record<string, any>) => Promise<{
        error: Error;
        data?: undefined;
    } | {
        data: any[] | null;
        error: import("@supabase/supabase-js").PostgrestError | null;
    }>;
};
//# sourceMappingURL=supabase.d.ts.map