import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";

export const deleteComment = async (selectedComment) => {
    try {
        const { error: deleteError } = await supabase
            .from('comments')
            .delete()
            .eq('id', selectedComment);

        if (deleteError) {
            console.error(deleteError);
        }
        toast.success("Comment deleted successfully");

    } catch (error) {
        console.error("Failed to delete comment:", error);
    }
}