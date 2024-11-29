import supabase from "../global/supabaseClient";
import { filePathCreator } from "../../helpers/filePathCreator";
import moment from "moment";

export const updateBlog = async (session, blog, file) => {
    const date = moment().format("MMMM D, YYYY");
    const { id, title, introduction, slug, content } = blog;
    const filePath = filePathCreator(file);
    try {
        let { data, error } = await supabase
            .from("blogs")
            .update({
                user_id: session.user.id,
                title: title,
                slug: slug,
                introduction: introduction,
                content: content,
                updated_at: date,
                thumbnail: filePath,
            })
            .match({ id: id })
            .select("*")

        if (data) {
            console.log("successfully updated the blog", data)
        } else {
            console.log(error)
        }

        if (file) {
            const { data: uploadedFile, error: uploadError } = await supabase.storage
                .from("thumbnail")
                .upload(`Thumbnail/${filePath}`, file, { upsert: true });

            if (uploadError) {
                console.error("Error uploading new thumbnail:", uploadError);
            } else {
                console.log("Thumbnail successfully updated:", uploadedFile);
            }
        }
    } catch (error) {
        console.error(error)
    }
};