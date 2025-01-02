import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";

export const signInUser = async (formData, setLoading) => {
    try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });
        if (error) throw error;
        toast.success("Successfully logged in!");
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
};