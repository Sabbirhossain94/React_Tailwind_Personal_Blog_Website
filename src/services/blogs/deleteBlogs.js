import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";

export const deleteBlogs = async (blogId) => {
    try {
        const { data: blogCoverPhoto, error: fetchError } = await supabase
            .from("blogs")
            .select("thumbnail")
            .eq("id", blogId)
            .single();

        if (fetchError) {
            console.log("Error fetching blog:", fetchError);
            return;
        }

        const thumbnailName = blogCoverPhoto?.thumbnail;

        const { error } = await supabase
            .from("blogs")
            .delete()
            .eq("id", blogId)

        if (error) {
            throw error;
        }

        if (thumbnailName) {
            const { error: deleteFileError } = await supabase.storage
                .from("thumbnail")
                .remove([`Thumbnail/${thumbnailName}`]);

            if (deleteFileError) {
                console.log("Error deleting thumbnail:", deleteFileError);
                return;
            }
        }
    } catch (error) {
        console.error("error", error)
    } finally {
        toast.success("Successfully deleted blog!")
    }
};