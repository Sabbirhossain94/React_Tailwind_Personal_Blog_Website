import supabase from "../global/supabaseClient";
import moment from "moment";
import toast from "react-hot-toast";

export const updateProfile = async (session, profile, file, setUpdateLoading) => {

    const date = moment().toISOString();

    try {

        if (!session?.user?.id) {
            console.error("User ID is undefined");
            return;
        }

        const { user } = session;

        const updateData = {
            username: profile.username,
            updated_at: date,
        };

        if (file) {
            updateData.avatar_url = `${file.name}`;
        }

        let { error: updateProfileError } = await supabase
            .from("profiles")
            .update(updateData)
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

        setTimeout(() => {
            setUpdateLoading(false);
        }, 1500)

        window.location.reload()

        toast.success("Profile updated successfully!", {
            duration: 1500
        })

    } catch (error) {
        console.log(error);
    }
}