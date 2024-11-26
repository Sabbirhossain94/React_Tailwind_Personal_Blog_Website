export const fetchBlogs = async ({
    supabase,
    setLoading,
    setRecentBlogs,
    setAllBlog,
    setTotalLength,
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    firstItemIndex,
    lastItemIndex
}) => {
    try {
        setLoading(true);

        let { data: allData, error: recentError } = await supabase
            .from("blogs")
            .select(`*,profiles(*)`)
            .range(0, 4)

        if (recentError) throw recentError;

        setRecentBlogs(allData || []);

        firstItemIndex = (currentPage - 1) * itemsPerPage;
        lastItemIndex = firstItemIndex + itemsPerPage;

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

