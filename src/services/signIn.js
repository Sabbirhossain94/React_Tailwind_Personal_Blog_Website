import supabase from "./supabaseClient";

export const signIn = async (e,email,setLoading) => {
    e.preventDefault();
    try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;

    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false);
    }
}