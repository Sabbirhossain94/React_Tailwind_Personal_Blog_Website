import supabase from "../global/supabaseClient";

export const getAllUsers = async (setUsers) => {
    try {

        let { data, error } = await supabase
            .from('profiles')
            .select('*')

        if (error) throw error;

        const updatedUsers = await Promise.all(
            data.map(async (user) => {
                if (user.avatar_url) {
                    const { data: avatarData, error: avatarError } = supabase
                        .storage
                        .from('avatars')
                        .getPublicUrl(`Profile Photo/${user.avatar_url}`);

                    if (avatarError) throw avatarError;

                    return { ...user, avatar_url: avatarData.publicUrl };
                } else {
                    return { ...user };
                }
            })
        );
        setUsers(updatedUsers)

    } catch (error) {
        alert(error)
    }
}