import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";

export const signOut = async () => {
    try {
        let { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
        }
        toast.success("Logged out successfully!", {
            duration: 3000
        })
    } catch (error) {
        console.error(error)
    }

};