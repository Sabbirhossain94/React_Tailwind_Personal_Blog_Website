import { useState, useEffect } from "react";
import supabase from "../services/global/supabaseClient";

const useFetchBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [totalBlogs, setTotalBlogs] = useState(4);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data, error } = await supabase
                    .from("blogs")
                    .select(`*`)
                    .order('id', { ascending: true });

                if (error) throw error;
                setBlogs(data || []);
                setTotalBlogs(data?.length)
            } catch (err) {
                setError(err.message);
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [supabase]);

    return { loading, blogs, totalBlogs, error };
};

export default useFetchBlogs;