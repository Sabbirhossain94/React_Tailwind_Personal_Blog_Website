import supabase from "../global/supabaseClient";
import moment from "moment";
import toast from "react-hot-toast";

export const createBlog = async (session, blog, file, navigate, setLoading) => {
    const date = moment().format("MMMM D, YYYY");
    const { title, introduction, slug, topic, content } = blog;
    setLoading(true)
    try {
        let { error: blogError } = await supabase
            .from("blogs")
            .insert({
                user_id: session.user.id,
                title: title,
                slug: slug,
                introduction: introduction,
                content: content,
                topic: topic,
                inserted_at: date,
                thumbnail: file.name,
            })
            .single();
        if (blogError) {
            console.error(blogError)
        }

        let { error: uploadError } = await supabase.storage
            .from("thumbnail")
            .upload(`Thumbnail/${file.name}`, file);
        if (uploadError) {
            console.error(uploadError);
        }

        toast.success("Blog created successfully", {
            duration: 2000
        });
        setTimeout(()=> {
            navigate("/dashboard/posts");
        },1000)
        setLoading(false)

    } catch (error) {
        console.error(error)
    }
};