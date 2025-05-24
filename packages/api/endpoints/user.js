import { createClient } from '../supabase';
export const getUserProfile = async (userId) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
    return data;
};
export const updateUserProfile = async (userId, profile) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', userId)
        .select()
        .single();
    if (error) {
        console.error('Error updating user profile:', error);
        return null;
    }
    return data;
};
//# sourceMappingURL=user.js.map