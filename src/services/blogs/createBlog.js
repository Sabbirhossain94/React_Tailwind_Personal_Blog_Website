import supabase from "../global/supabaseClient";
import moment from "moment";
import toast from "react-hot-toast";

export const createBlog = async (session, blog, file, navigate) => {
    const date = moment().format("MMMM D, YYYY");
    const { title, introduction, slug, content } = blog;
    try {
        let { error: blogError } = await supabase
            .from("blogs")
            .insert({
                user_id: session.user.id,
                title: title,
                slug: slug,
                introduction: introduction,
                content: content,
                inserted_at: date,
                thumbnail: file.name,
            })
            .single();
        if (blogError) {
            console.log(blogError)
        }

        toast.success("Blog created successfully");
        navigate("/dashboard/posts");
        
        let { error: uploadError } = await supabase.storage
            .from("thumbnail")
            .upload(`Thumbnail/${file.name}`, file);
        if (uploadError) {
            console.log(uploadError);
        }

    } catch (error) {
        console.error(error)
    }
};