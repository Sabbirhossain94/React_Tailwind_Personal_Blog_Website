import supabase from "../../global/supabaseClient";

export const addLike = async (session, commentId) => {

    if (!session?.user?.id) {
        return;
    }
    
    try {
        const { data: existingLike, error: fetchError } = await supabase
            .from('likes')
            .select('*')
            .eq('user_id', session?.user?.id)
            .eq('comment_id', commentId)
            .maybeSingle();

        if (fetchError) {
            throw fetchError;
        }

        if (existingLike) {

            const { error: deleteError } = await supabase
                .from('likes')
                .delete()
                .eq('id', existingLike.id);

            if (deleteError) throw deleteError;

        } else {
            const { error: insertError } = await supabase
                .from('likes')
                .insert({
                    user_id: session?.user?.id,
                    comment_id: commentId,
                });

            if (insertError) throw insertError;

        }
    } catch (error) {
        console.error("Error toggling like:", error);
    }
}