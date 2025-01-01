import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";

export const deleteMultipleBlogs = async (blogIds) => {
    try {

        const { data: blogCoverPhotos, error: fetchError } = await supabase
            .from("blogs")
            .select("thumbnail")
            .in("id", blogIds)

        if (fetchError) {
            console.log("Error fetching blog:", fetchError);
            return;
        }

        const thumbnailArray = blogCoverPhotos?.map((item) => `Thumbnail/${item.thumbnail}`)

        const { error } = await supabase
            .from("blogs")
            .delete()
            .in("id", blogIds)

        if (error) {
            throw error;
        }

        if (thumbnailArray.length > 0) {
            const { error: deleteFileError } = await supabase.storage
                .from("thumbnail")
                .remove(thumbnailArray);

            if (deleteFileError) {
                console.log("Error deleting thumbnail:", deleteFileError);
                return;
            }
        }

    } catch (error) {
        console.error("error", error)
    } finally {
        toast.success("Successfully deleted blogs!")
    }
};