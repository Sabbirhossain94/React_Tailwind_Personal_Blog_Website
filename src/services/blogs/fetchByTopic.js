import supabase from "../global/supabaseClient";

export const fetchBlogsByTopic = async (topic, setBlogs, setLoading,
    setTotalLength, currentPage) => {
    try {
        setLoading(true);

        let firstItemIndex = (currentPage - 1) * 4;
        let lastItemIndex = firstItemIndex + 4;

        let { data, count, error } = await supabase
            .from("blogs")
            .select(`*`, { count: "exact" })
            .range(firstItemIndex, lastItemIndex - 1)
            .eq('topic', topic)
            .order('id', { ascending: true });

        if (error) throw error;
        setBlogs((prevBlogs) => ({
            ...prevBlogs, main: [], topics: data
        }))
        setTotalLength(count);

    } catch (error) {
        console.log(error.message);
    } finally {
        setLoading(false);
    }
};

