import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";

export const passwordUpdate = async (updatedPass) => {
    try {
        const { error } = await supabase.auth.updateUser({
            password: updatedPass,
        })
        if (error) throw error;
        toast.success("Password updated successfully!")
    } catch (error) {
        alert(error)
    }
}