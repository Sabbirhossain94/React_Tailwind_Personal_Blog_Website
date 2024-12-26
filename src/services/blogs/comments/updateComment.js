import supabase from "../../global/supabaseClient";
import moment from "moment";
import toast from "react-hot-toast";

export const updateComment = async (session, edit) => {

    if (!session?.user?.id) {
        return;
    }

    const date = moment().format("MMMM D, YYYY");

    const { commentId, content } = edit;
    try {

        const updateData = {
            content: content,
            created_at: date,
        };

        let { error: updateError } = await supabase
            .from("comments")
            .update(updateData)
            .eq('id', commentId)


        if (updateError) {
            console.error("Error updating comment:", updateError);
            return;
        }

        toast.success("Comment updated successfully");

    } catch (error) {
        console.error("Unexpected error:", error);
    }


}