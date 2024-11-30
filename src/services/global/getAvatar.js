import supabase from "./supabaseClient";

export const avatarFIle = async () => {
    try {
        let { data, error } = await supabase
            .from("profiles")
            .select("avatar_url");

        if (error) {
            throw error;
        }
        if (data) {
            const [file] = data;
            return await getAvatarFromStorage(file);
        }
    } catch (error) {
        console.log(error.message);
    }
};

const getAvatarFromStorage = async (file) => {
    try {
        let { data } = await supabase.storage
            .from("avatars")
            .download(`Profile Photo/${file.avatar_url}`);
        if (data) {
            return URL.createObjectURL(data);
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};