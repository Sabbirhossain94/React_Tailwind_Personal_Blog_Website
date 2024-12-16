import supabase from "../global/supabaseClient";

export const createProfile = async () => {
    try {
        let { error: blogError } = await supabase
            .from("profiles")
            .insert({
                id: session.user.id,
                title: title,
                slug: slug,
                introduction: introduction,
                content: content,
                topic: topic,
                inserted_at: date,
                thumbnail: file.name,
            })
            .single();
    } catch (error) {
        alert(error)
    }
}