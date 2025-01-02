import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";
import moment from "moment";

export const signUp = async (formData, setLoading) => {

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
        const date = moment(user.created_at).toISOString()

        let { error: blogError } = await supabase
            .from("profiles")
            .insert({
                id: user.id,
                username: formData.fullName,
                role: "user",
                created_at: date,
                email: user.email
            })
            .single();

        if (blogError) throw blogError

        toast.success("Successfully registered!")
    } catch (error) {
        toast.error(error.message)
    } finally {
        window.location.reload()
        setLoading(false)
    }

}