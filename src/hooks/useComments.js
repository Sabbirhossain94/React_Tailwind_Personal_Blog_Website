import { useState, useEffect } from "react";
import { allComments } from "../services/blogs/comments/allComments";

const useComments = () => {
    const [comments, setComments] = useState({
        all: [],
        sinceLastMonth: null,
    })
    const [loading, setLoading] = useState(false)

    const fetchComments = async () => {
        setLoading(true)
        try {
            const { allCommentsData, recentData } = await allComments();
            setComments({ ...comments, all: allCommentsData, sinceLastMonth: recentData })
        } catch (error) {
            console.error("Failed to load comments:", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);


    return { loading, comments, refetch: fetchComments };
}

export default useComments;