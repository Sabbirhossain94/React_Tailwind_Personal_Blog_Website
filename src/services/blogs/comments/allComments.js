import supabase from "../../global/supabaseClient";
import moment from 'moment';

export const allComments = async () => {

    try {
        const lastMonthStart = moment().subtract(1, 'month').startOf('month').toISOString();
        const currentDate = moment().toISOString()

        const { data: allCommentsData, error } = await supabase
            .from('comments')
            .select(`*,likes(*),profiles(*)`)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const { data: recentData, error: recentError } = await supabase
            .from('comments')
            .select(`*`)
            .gte('created_at', lastMonthStart)
            .lte('created_at', currentDate);

        if (recentError) throw recentError

        return { allCommentsData, recentData }
    } catch (error) {

    }
}