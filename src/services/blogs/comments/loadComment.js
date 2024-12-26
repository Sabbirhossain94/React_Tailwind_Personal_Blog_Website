import supabase from "../../global/supabaseClient";

export const loadComment = async (blogId) => {
    try {
        let { data: commentsData, error } = await supabase
            .from('comments')
            .select(`*, profiles(*),likes(*)`)
            .eq("blog_id", blogId);

        if (error) throw error;

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