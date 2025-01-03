import supabase from "../../global/supabaseClient";
import toast from "react-hot-toast";

export const deleteMultipleComments = async (commentIds) => {
    try {
        const { error } = await supabase
            .from("comments")
            .delete()
            .in("id", commentIds)

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error(error)
    } finally {
        toast.success("Successfully deleted comments!")
    }
}