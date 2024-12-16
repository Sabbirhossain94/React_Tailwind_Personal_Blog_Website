import supabase from "../global/supabaseClient";

export const fetchRecentBlogs = async ({
    setLoading,
    setRecentBlogs,
}) => {
    try {
        setLoading(true);
        let { data: allData, error: recentError } = await supabase
            .from("blogs")
            .select(`*`)
            .order('id', { ascending: false })
            .limit(4)

        if (recentError) throw recentError;

        setRecentBlogs(allData || []);

    } catch (error) {
        console.log(error.message);
    } finally {
        setLoading(false);
    }
};

