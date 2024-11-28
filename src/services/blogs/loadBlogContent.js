import supabase from "../global/supabaseClient";

export const loadBlogContent = async (slug, setBlog) => {
    try {
        let { data, error } = await supabase
            .from("blogs")
            .select("*")
            .eq("slug", slug);

        if (data) {
            const [blog] = data

            let { data: downloadCoverUrl } = supabase.storage
                .from("thumbnail")
                .getPublicUrl(`Thumbnail/${blog.thumbnail}`);

            setBlog((prevData) => ({
                ...prevData,
                title: blog.title,
                introduction: blog.introduction,
                slug: blog.slug,
                content: blog.content,
                coverphoto: downloadCoverUrl
            }));
        } else {
            console.log(error);
        }
    } catch (error) {
        return null;
    }
};