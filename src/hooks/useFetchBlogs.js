import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const useFetchBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data, error } = await supabase
                    .from("blogs")
                    .select(`*, profiles(*)`);

                if (error) throw error;

                setBlogs(data || []);
            } catch (err) {
                setError(err.message);
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [supabase]);

    return { loading, blogs, error };
};

export default useFetchBlogs;