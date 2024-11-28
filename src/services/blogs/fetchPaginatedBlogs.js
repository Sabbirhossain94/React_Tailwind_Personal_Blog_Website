import supabase from "../global/supabaseClient";

export const fetchPaginatedBlogs = async ({
    setLoading,
    setAllBlog,
    setTotalLength,
    currentPage,
    itemsPerPage,
    setItemsPerPage,
}) => {
    try {
        setLoading(true);

        let firstItemIndex = (currentPage - 1) * itemsPerPage;
        let lastItemIndex = firstItemIndex + itemsPerPage;

        let { data, count, error, status } = await supabase
            .from("blogs")
            .select(`*,profiles(*)`, { count: "exact" })
            .range(firstItemIndex, lastItemIndex - 1);

        if (error && status !== 406) throw error;
        setItemsPerPage(data.length)
        setAllBlog(data || []);
        setTotalLength(count);
    } catch (error) {
        console.log(error.message);
    } finally {
        setLoading(false);
    }
};

