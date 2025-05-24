import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const createClient = (): SupabaseClient => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-anon-key';
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

// Auth helpers
export const signUp = async (
  supabase: SupabaseClient,
  email: string,
  password: string,
  metadata: Record<string, any> = {}
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });

  return { data, error };
};

export const signIn = async (
  supabase: SupabaseClient,
  email: string,
  password: string
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const signOut = async (supabase: SupabaseClient) => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (
  supabase: SupabaseClient,
  email: string
) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined,
  });

  return { data, error };
};

export const getUser = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};

export const updateUserProfile = async (
  supabase: SupabaseClient,
  profile: Record<string, any>
) => {
  const { data: user, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user.user) {
    return { error: userError || new Error('User not found') };
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: user.user.id,
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .select();
    
  return { data, error };
};

// Export helper functions
export const supabaseHelpers = {
  signUp,
  signIn,
  signOut,
  resetPassword,
  getUser,
  updateUserProfile,
}; 