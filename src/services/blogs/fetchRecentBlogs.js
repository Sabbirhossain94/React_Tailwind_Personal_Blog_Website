import supabase from "../global/supabaseClient";

export const fetchRecentBlogs = async ({
    setLoading,
    setRecentBlogs,
}) => {
    try {
        setLoading(true);
        let { data: allData, error: recentError } = await supabase
            .from("blogs")
            .select(`*,profiles(*)`)
            .range(0, 4)

        if (recentError) throw recentError;

        setRecentBlogs(allData || []);

    } catch (error) {
        console.log(error.message);
    } finally {
        setLoading(false);
    }
};

