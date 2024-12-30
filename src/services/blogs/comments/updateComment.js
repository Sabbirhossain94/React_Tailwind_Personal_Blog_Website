import supabase from "../../global/supabaseClient";
import moment from "moment";
import toast from "react-hot-toast";

export const updateComment = async (session, edit) => {
    if (!session?.user?.id) {
        return;
    }

    const date = moment().toISOString();
    const { commentId, content, rating } = edit;

    try {
        const updateData = { created_at: date };

        if (content) {
            updateData.content = content;
        }

        if (rating === 0) {
            updateData.rating = null;
        }

        if (rating) {
            updateData.rating = rating;
        }

        if (Object.keys(updateData).length > 1) {
            const { error: updateError } = await supabase
                .from("comments")
                .update(updateData)
                .eq('id', commentId);

            if (updateError) {
                console.error("Error updating comment:", updateError);
                return;
            }

            toast.success("Comment updated successfully");
        } else {
            console.error("No changes to update");
        }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
};