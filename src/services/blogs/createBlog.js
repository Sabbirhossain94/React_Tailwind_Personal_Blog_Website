import supabase from "../global/supabaseClient";
import moment from "moment";

export const createBlog = async (session, blog, file) => {
    const date = moment().format("MMMM D, YYYY");
    const { title, introduction, slug, content, coverphoto } = blog;
    try {
        let { data, error } = await supabase
            .from("blogs")
            .insert({
                user_id: session.user.id,
                title: title,
                slug: slug,
                introduction: introduction,
                content: content,
                inserted_at: date,
                thumbnail: coverphoto,
            })
            .single();
        if (error) {
            console.error(error)
        } else {
            console.log(data)
        }

        let { data: uploaded, error: uploadError } = await supabase.storage
            .from("thumbnail")
            .upload(`Thumbnail/${coverphoto}`, file);
        if (uploadError) {
            console.log(uploadError);
        } else {
            console.log("successfully uploaded cover photo!", uploaded)
        }

    } catch (error) {
        console.error(error)
    }
};