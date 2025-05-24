import { createClient } from '../supabase';
export const getSkinAnalysis = async (userId) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('skin_analysis_results')
        .select('*')
        .eq('userId', userId)
        .order('createdAt', { ascending: false })
        .limit(1)
        .single();
    if (error) {
        console.error('Error fetching skin analysis:', error);
        return null;
    }
    return data;
};
export const submitSkinAnalysis = async (userId, imageUrl) => {
    const supabase = createClient();
    // First store the image submission
    const { data, error } = await supabase
        .from('skin_analysis_submissions')
        .insert({
        userId,
        imageUrl,
        status: 'pending'
    })
        .select('id')
        .single();
    if (error) {
        console.error('Error submitting skin analysis:', error);
        return null;
    }
    // Trigger serverless function to process the image
    // This would normally call a serverless function
    try {
        const { error: fnError } = await supabase.functions.invoke('process-skin-analysis', {
            body: {
                submissionId: data.id,
                userId,
                imageUrl
            }
        });
        if (fnError) {
            console.error('Error triggering skin analysis function:', fnError);
        }
    }
    catch (err) {
        console.error('Failed to invoke function:', err);
    }
    return { id: data.id };
};
//# sourceMappingURL=skinAnalysis.js.map