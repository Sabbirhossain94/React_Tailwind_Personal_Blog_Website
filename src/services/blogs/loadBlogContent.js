import supabase from "../global/supabaseClient";


export const loadBlogContent = async (slug) => {
    try {
        let { data: blog, error } = await supabase
            .from("blogs")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error) {
            console.error("Error fetching blog:", error);
            throw error;
        }

        let { data: downloadCoverUrl, error: coverError } = supabase.storage
            .from("thumbnail")
            .getPublicUrl(`Thumbnail/${blog.thumbnail}`);

        if (coverError) {
            console.error("Error fetching cover photo URL:", coverError);
            throw coverError;
        }

        return { ...blog, coverphoto: downloadCoverUrl.publicUrl };
    } catch (error) {
        console.error("Failed to load blog content:", error);
        throw error;
    }
};