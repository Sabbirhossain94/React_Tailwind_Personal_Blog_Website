import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";

export const signIn = async (e, email, setLoading) => {
    e.preventDefault();
    try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        toast.success("Check your email for magic link")
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false);
    }
}