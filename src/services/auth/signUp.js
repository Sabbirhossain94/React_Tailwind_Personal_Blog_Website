import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";
import moment from "moment";

export const signUp = async (formData, setLoading) => {
    const date = moment().format("MMMM D, YYYY");
    try {
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.fullName
                }
            }
        })
        if (error) throw error;

        const { user } = data

        let { error: blogError } = await supabase
            .from("profiles")
            .insert({
                id: user.id,
                username: formData.fullName,
                role: "user",
                created_at: user.created_at,
                email: user.email
            })
            .single();
            
        if (blogError) throw blogError

        toast.success("Successfully registered!")
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }

}