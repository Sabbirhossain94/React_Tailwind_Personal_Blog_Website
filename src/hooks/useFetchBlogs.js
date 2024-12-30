import { useState, useEffect } from "react";
import supabase from "../services/global/supabaseClient";
import moment from "moment";

const useFetchBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState({
        all: [],
        length: 4,
        sinceLastMonth: null
    });
    // const [totalBlogs, setTotalBlogs] = useState(4);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const lastMonthStart = moment().subtract(1, 'month').startOf('day').toISOString();
                const currentDate = moment().toISOString()

                setLoading(true);

                const { data, error } = await supabase
                    .from("blogs")
                    .select(`*`)
                    .order('id', { ascending: true });

                if (error) throw error;
                
                const { data: recentBlogsData, error: recentError } = await supabase
                    .from("blogs")
                    .select(`*`)
                    .order('id', { ascending: true })
                    .gte('inserted_at', lastMonthStart)
                    .lte('inserted_at', currentDate);

                if (recentError) throw recentError;

                setBlogs({ ...blogs, all: data || [], length: data?.length, sinceLastMonth: recentBlogsData })

            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [supabase]);

    return { loading, blogs };
};

export default useFetchBlogs;