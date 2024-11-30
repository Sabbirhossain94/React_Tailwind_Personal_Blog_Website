import supabase from "../global/supabaseClient";
import moment from "moment";
import toast from "react-hot-toast";

export const updateBlog = async (session, blog, file, navigate) => {
    const date = moment().format("MMMM D, YYYY");
    const { id, title, introduction, slug, content, thumbnail: existingThumbnail } = blog;

    try {
        const updateData = {
            user_id: session.user.id,
            title,
            slug,
            introduction,
            content,
            updated_at: date,
        };

        if (file) {
            updateData.thumbnail = `${file.name}`;
        }

        let { error: updateError } = await supabase
            .from("blogs")
            .update(updateData)
            .match({ id });

        if (updateError) {
            console.error("Error updating blog:", updateError);
            return;
        }

        toast.success("Blog updated successfully");
        navigate("/dashboard/posts");

        if (file) {
            const targetPath = existingThumbnail || `${file.name}`;
            const { error: uploadError } = await supabase.storage
                .from("thumbnail")
                .upload(`Thumbnail/${targetPath}`, file, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (uploadError) {
                console.error("Error uploading new thumbnail:", uploadError);
            }
        }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
};