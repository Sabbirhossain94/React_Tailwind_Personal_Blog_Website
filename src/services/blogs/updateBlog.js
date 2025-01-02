import supabase from "../global/supabaseClient";
import moment from "moment";
import toast from "react-hot-toast";

export const updateBlog = async (session, blog, file, navigate, setLoading) => {

    const date = moment().toISOString();

    const { id, title, introduction, slug, topic, content, thumbnail: existingThumbnail } = blog;

    setLoading(true)

    try {
        const updateData = {
            user_id: session.user.id,
            title,
            introduction,
            slug,
            topic,
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
        toast.success("Blog updated successfully", {
            duration: 4000
        });
        setTimeout(() => {
            navigate("/dashboard/posts");
            setLoading(false);
        }, 1000)
    } catch (error) {
        console.error("Unexpected error:", error);
    }
};