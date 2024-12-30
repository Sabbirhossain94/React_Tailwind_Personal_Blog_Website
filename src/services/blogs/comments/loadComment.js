import supabase from "../../global/supabaseClient";

export const loadComment = async (blogId, filter) => {
    try {
        let query = supabase
            .from('comments')
            .select(`*, profiles(*), likes(*)`)
            .eq("blog_id", blogId)
            .order('created_at', { ascending: filter.sortBy === "latest" ? false : true });

        if (filter.rating === 6) {
            query = query.is("rating", null); 
        } else if (filter.rating && filter.rating !== 0) {
            query = query.eq("rating", filter.rating); 
        }

        const { data: commentsData, error } = await query;

        if (error) {
            throw error; 
        }

        const updatedComments = await Promise.all(
            commentsData.map(async (comment) => {
                if (comment.profiles.avatar_url) {
                    const { data: avatarData, error: avatarError } = await supabase
                        .storage
                        .from('avatars')
                        .getPublicUrl(`Profile Photo/${comment.profiles.avatar_url}`);

                    if (avatarError) {
                        console.error("Failed to fetch avatar URL:", avatarError);
                        return { ...comment, avatar_url: null };
                    }

                    return { ...comment, avatar_url: avatarData.publicUrl };
                } else {
                    return { ...comment, avatar_url: null };
                }
            })
        );

        return updatedComments;
    } catch (error) {
        console.error("Failed to load comments:", error);
        return [];
    }
};