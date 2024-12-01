import supabase from "../global/supabaseClient";
import moment from "moment";
import toast from "react-hot-toast";

export const updateProfile = async (session, profile, file) => {
    const date = moment().format("MMMM D, YYYY");
    try {
        if (!session?.user?.id) {
            console.error("User ID is undefined");
            return;
        }

        const { user } = session;
        let { error: updateProfileError } = await supabase
            .from("profiles")
            .update({
                username: profile.username,
                avatar_url: file.name,
                updated_at: date,
            })
            .match({ id: user.id });
        if (updateProfileError) {
            console.error(updateProfileError)
        }

        let { data: avatarData, error: profileAvatarError } = await supabase
            .from("profiles")
            .select(`avatar_url`)
            .eq("id", session?.user?.id)
            .single();

        if (profileAvatarError) {
            console.error(profileAvatarError)
        }

        if (file) {
            const targetPath = avatarData.avatar_url || `${file.name}`;
            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(`Profile Photo/${targetPath}`, file, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (uploadError) {
                console.error("Error uploading new Profile photo:", uploadError);
            }
        }

        window.location.reload()
        toast.success("Profile updated successfully!")

    } catch (error) {
        console.log(error.message);
    }
}