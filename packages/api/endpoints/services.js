import { createClient } from '../supabase';
export const getServices = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('isActive', true)
        .order('name');
    if (error) {
        console.error('Error fetching services:', error);
        return [];
    }
    return data;
};
export const getServiceById = async (serviceId) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', serviceId)
        .single();
    if (error) {
        console.error('Error fetching service:', error);
        return null;
    }
    return data;
};
export const getServiceCategories = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('service_categories')
        .select('*, services(*)')
        .order('name');
    if (error) {
        console.error('Error fetching service categories:', error);
        return [];
    }
    return data;
};
//# sourceMappingURL=services.js.map