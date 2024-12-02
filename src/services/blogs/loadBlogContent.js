import supabase from "../global/supabaseClient";

export const loadBlogContent = async (slug, setBlog, setLoading) => {
    setLoading(true)
    try {
        let { data: blog, error } = await supabase
            .from("blogs")
            .select("*")
            .eq("slug", slug)
            .single()

        if (error) {
            console.error(error)
        }

        let { data: downloadCoverUrl } = supabase.storage
            .from("thumbnail")
            .getPublicUrl(`Thumbnail/${blog.thumbnail}`);

        setBlog((prevData) => ({
            ...prevData,
            id: blog.id,
            title: blog.title,
            introduction: blog.introduction,
            slug: blog.slug,
            topic: blog.topic,
            content: blog.content,
            coverphoto: downloadCoverUrl
        }));
    } catch (error) {
        return null;
    } finally {
        setLoading(false)
    }
};