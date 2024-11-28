import supabase from "../global/supabaseClient";

export const signOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
    }
};