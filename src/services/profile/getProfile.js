import supabase from "../global/supabaseClient";

export const getProfile = async (session, setProfile, setLoading) => {

    if (!session?.user?.id) {
        return;
    }

    setLoading(true)

    try {
        const { user } = session

        let { data: profileData, error: ProfileError } = await supabase
            .from("profiles")
            .select(`username, avatar_url`)
            .eq("id", user?.id)
            .single();

        if (ProfileError) {
            console.error(ProfileError)
            return
        }

        if (profileData?.avatar_url) {
            const { data: avatarData, error: avatarError } = supabase.storage
                .from("avatars")
                .getPublicUrl(`Profile Photo/${profileData.avatar_url}`);

            if (avatarError) {
                console.error("Error fetching avatar URL:", avatarError);
                return;
            }

            setProfile({
                username: profileData.username,
                avatarUrl: avatarData.publicUrl,
            });
        } else {
            setProfile({ username: profileData.username, avatarUrl: "" });
        }

    } catch (error) {
        console.log(error.message);
    }
    finally {
        setLoading(false)
    }
};