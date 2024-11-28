import supabase from "../global/supabaseClient";

export const deleteBlogs = async (blogId) => {
    const { data, error } = await supabase
        .from("blogs")
        .delete()
        .match({ id: blogId });
    if (error) {
        console.log(error);
    } else {
        console.log(data)
        // navigate("/");
    }
};