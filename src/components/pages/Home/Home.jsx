import { useState, useEffect, useCallback } from "react";
import Pagination from "../../layout/pagination/Pagination"
import RecentBlogs from "../../layout/common/RecentBlogs";
import { fetchPaginatedBlogs } from "../../../services/blogs/fetchPaginatedBlogs";
import { fetchBlogsByTopic } from "../../../services/blogs/fetchByTopic";
import usePagination from "../../../hooks/usePagination";
import BlogsCard from "./BlogsCard";
import TopicsCard from "./TopicsCard";
import AboutMe from "../../layout/static/AboutMe";
import Topics from "../../../components/layout/common/Topics";

function Home() {
    const { currentPage, setCurrentPage, totalLength, setTotalLength, resetPagination } = usePagination();
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState({
        main: [],
        topics: []
    })
    const [topics, setTopics] = useState("")

    const fetchBlogs = useCallback(() => {
        if (topics) {
            fetchBlogsByTopic(
                topics,
                setBlogs,
                setLoading,
                setTotalLength,
                currentPage,
            );
        } else {
            fetchPaginatedBlogs({
                setBlogs,
                setLoading,
                currentPage,
                setTotalLength
            });
        }
    }, [currentPage, topics]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return (
        <div className="bg-gray-100 dark:bg-zinc-800">
            <div className="flex justify-center max-w-7xl mx-auto py-20">
                <div className="min-h-screen flex flex-col justify-start w-3/4 relative dark:bg-zinc-800 mt-20">
                    {topics ?
                        <TopicsCard
                            loading={loading}
                            blogs={blogs}
                            setTopics={setTopics}
                            resetPagination={resetPagination}
                        />
                        : <BlogsCard
                            loading={loading}
                            blogs={blogs}
                        />
                    }
                    <Pagination
                        blogs={blogs}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalLength={totalLength}
                    />
                </div>
                <div className="mt-20 flex flex-col gap-10 w-1/4">
                    <AboutMe />
                    <Topics
                        setTopics={setTopics}
                        resetPagination={resetPagination}
                    />
                    <RecentBlogs />
                </div>
            </div>
        </div>
    );
}

export default Home;