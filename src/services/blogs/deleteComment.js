import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";

export const deleteComment = async (createComment) => {
    const { commentId } = createComment
    try {
        const { error: deleteError } = await supabase
            .from('comments')
            .delete()
            .eq('id', commentId);

        if (deleteError) {
            console.error(deleteError);
        }
        toast.success("Comment deleted successfully");

    } catch (error) {
        console.error("Failed to delete comment:", error);
    }
}