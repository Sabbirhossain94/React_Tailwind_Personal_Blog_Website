import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../layout/pagination/Pagination"
import RecentBlogs from "../../layout/common/RecentBlogs";
import { fetchPaginatedBlogs } from "../../../services/blogs/fetchPaginatedBlogs";
import { fetchBlogsByTopic } from "../../../services/blogs/fetchByTopic";
import BlogsCard from "./BlogsCard";
import TopicsCard from "./TopicsCard";
import AboutMe from "../../layout/static/AboutMe";
import Topics from "../../../components/layout/common/Topics";

function Home() {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState({
        main: [],
        topics: []
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLength, setTotalLength] = useState(null);
    const [topics, setTopics] = useState("")
    const location = useLocation();
    const hasTopic = location.pathname.split("/").includes("topic")

    const fetchBlogsCallback = useCallback(() => {
        if (!hasTopic) {
            fetchPaginatedBlogs({
                setBlogs,
                setLoading,
                setTotalLength,
                currentPage,
            });
        }
    }, [currentPage]);

    useEffect(() => {
        fetchBlogsCallback();
    }, [fetchBlogsCallback]);

    const fetchBlogsOfTopic = useCallback(() => {
        if (topics) {
            fetchBlogsByTopic(
                topics,
                setBlogs,
                setLoading,
                setTotalLength,
                currentPage,
            );
        }
    }, [topics, currentPage, setBlogs, setTotalLength]);

    useEffect(() => {
        fetchBlogsOfTopic();
    }, [fetchBlogsOfTopic]);


    return (
        <div className="bg-gray-100 dark:bg-zinc-800">
            <div className="flex justify-center max-w-7xl mx-auto py-20">
                <div className="min-h-screen flex flex-col justify-start w-3/4 relative dark:bg-zinc-800 mt-20">
                    {hasTopic ? <TopicsCard
                        loading={loading}
                        blogs={blogs}
                        topics={topics}
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
                    <AboutMe loading={loading} />
                    <Topics setTopics={setTopics} />
                    <RecentBlogs />
                </div>
            </div>
        </div>
    );
}

export default Home;
