import supabase from "../global/supabaseClient";

export const fetchBlogsByTopic = async (topic) => {
    try {
        let { data, error } = await supabase
            .from("blogs")
            .select(`*`)
            .eq('topic', topic)

        if (error) throw error;

        return data

    } catch (error) {
        console.log(error.message);
    }
};

