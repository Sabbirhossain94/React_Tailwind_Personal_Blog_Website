import supabase from "../../global/supabaseClient";
import moment from "moment"
import toast from "react-hot-toast";

export const addComment = async (session, comment, blogId) => {

    if (!session?.user?.id) {
        return;
    }

    const date = moment().format("MMMM D, YYYY");

    try {
        let { error: commentError } = await supabase
            .from("comments")
            .insert({
                user_id: session?.user?.id,
                created_at: date,
                blog_id: blogId,
                content: comment
            })
            .single();

        if (commentError) {
            console.error(commentError)
        }
        toast.success("Comment added successfully")
    } catch (error) {
        console.error(error)
    }
}