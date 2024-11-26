import supabase from "./supabaseClient";

export const avatarFIle = async () => {
    try {
        let { data, error, status } = await supabase
            .from("profiles")
            .select("avatar_url");

        if (error && status !== 406) {
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
        let { data, error } = await supabase.storage
            .from("avatars")
            .download(`Profile Photo/${file.avatar_url}`);
        if (data) {
            return URL.createObjectURL(data);
        } else {
            console.log(error);
            return null;
        }
    } catch (error) {
        console.log(error.message);
        return null;
    }
};