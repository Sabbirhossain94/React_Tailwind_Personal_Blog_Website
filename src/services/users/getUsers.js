import supabase from "../global/supabaseClient";
import moment from 'moment';

export const getAllUsers = async (setUsers, setLoading) => {
    try {
        const lastMonthStart = moment().subtract(1, 'month').startOf('day').toISOString();
        const currentDate = moment().toISOString()

        setLoading(true)

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
        setUsers((prevState) => ({ ...prevState, all: updatedUsers }))

        let { data: recentUsersData, error: recentError } = await supabase
            .from('profiles')
            .select('*')
            .gte('created_at', lastMonthStart)
            .lte('created_at', currentDate);
            
        if (recentError) throw error;

        setUsers((prevState) => ({ ...prevState, sinceLastMonth: recentUsersData }))

    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}