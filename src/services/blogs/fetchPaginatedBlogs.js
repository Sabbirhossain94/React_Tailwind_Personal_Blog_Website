import supabase from "../global/supabaseClient";

export const fetchPaginatedBlogs = async ({
    setBlogs,
    setLoading,
    currentPage,
    setTotalLength
}) => {
    try {
        setLoading(true);

        let firstItemIndex = (currentPage - 1) * 4;
        let lastItemIndex = firstItemIndex + 4;

        let { data, count, error } = await supabase
            .from("blogs")
            .select(`*`, { count: "exact" })
            .range(firstItemIndex, lastItemIndex - 1)
            .order('id', { ascending: true });

        if (error) throw error;
        setBlogs((prevBlogs) => ({
            ...prevBlogs, main: data, topics: []
        }))
        setTotalLength(count)
    } catch (error) {
        console.log(error.message);
    } finally {
        setLoading(false);
    }
};

