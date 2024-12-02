import supabase from "../global/supabaseClient";

export const fetchPaginatedBlogs = async ({
    setLoading,
    setAllBlog,
    setTotalLength,
    currentPage,
    itemsPerPage,
}) => {
    try {
        setLoading(true);

        let firstItemIndex = (currentPage - 1) * itemsPerPage;
        let lastItemIndex = firstItemIndex + itemsPerPage;

        let { data, count, error } = await supabase
            .from("blogs")
            .select(`*,profiles(*)`, { count: "exact" })
            .range(firstItemIndex, lastItemIndex - 1);

        if (error) throw error;
        setAllBlog(data || []);
        setTotalLength(count);
    } catch (error) {
        console.log(error.message);
    } finally {
        setLoading(false);
    }
};

