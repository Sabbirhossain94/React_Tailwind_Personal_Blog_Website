import "./index.css";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Pagination from "./components/layout/pagination/Pagination";
import RecentBlogs from "./components/layout/common/RecentBlogs";
import { blogCoverUrl } from "./helpers/storage";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { fetchPaginatedBlogs } from "./services/blogs/fetchPaginatedBlogs";
import { fetchBlogsByTopic } from "./services/blogs/fetchByTopic";
import { CardSkeleton } from "./components/layout/skeleton/Skeleton";
import AboutMe from "./components/layout/static/AboutMe";
import Topics from "./components/layout/common/Topics";

function BlogsCard({ loading, allBlog }) {
    return (<div className="flex flex-wrap gap-8">
        {loading ? (
            Array(4)
                .fill(null)
                .map((_, index) => <CardSkeleton key={index} />)
        ) : (
            allBlog.map((blog, key) => (
                <div key={key} className="relative w-[400px] rounded-md scale-100 transition duration-300 hover:scale-105">
                    <Link
                        to={`/blog/${blog.slug}`}
                        className="flex flex-col border border-zinc-300 dark:border-gray-100/10"
                    >
                        <div className="flex-shrink-0">
                            <img
                                className="h-48 w-full object-cover"
                                src={blogCoverUrl + blog.thumbnail}
                                alt="error"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-between dark:bg-zinc-900/50 bg-white p-6 ">
                            <div className="flex-1">
                                <div className="block">
                                    <p className="text-xl font-semibold dark:text-gray-200">
                                        {blog.title}
                                    </p>
                                    <p className="mt-2 text-md flex items-center gap-4">
                                        <span className="dark:text-teal-600 text-blue-500">
                                            {blog.inserted_at}
                                        </span>
                                        <span className="text-[10px] font-semibold bg-blue-50 dark:bg-teal-900/30 rounded-xl border border-blue-500 dark:border-teal-500 px-2 py-[2px] dark:text-teal-600 text-blue-500">
                                            {blog.topic}
                                        </span>
                                    </p>
                                    <div className="text-md mt-2 w-full h-[100px] overflow-hidden">
                                        <p
                                            className="text-md dark:text-gray-400 text-[#666]"
                                        >
                                            {blog.introduction}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div>
                                            <div className="text-md font-medium dark:text-gray-200 flex flex-row items-center transition ease-in-out duration-300 translate-x-0 hover:translate-x-2">
                                                <span>Read more</span>{" "}
                                                <AiOutlineDoubleRight className="dark:text-teal-500 text-blue-500 ml-1 " />
                                            </div>
                                            <div className="flex space-x-1 text-sm text-gray-500"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
        )}
    </div>
    )
}

function Home() {
    const [loading, setLoading] = useState(false);
    const [allBlog, setAllBlog] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLength, setTotalLength] = useState(null);
    const itemsPerPage = 4;

    const fetchBlogsCallback = useCallback(() => {
        fetchPaginatedBlogs({
            setLoading,
            setAllBlog,
            setTotalLength,
            itemsPerPage,
            currentPage,
        });
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        fetchBlogsCallback();
    }, [fetchBlogsCallback]);

    const blogsByTopic = async (topic) => {
        const fetchedBlogs = await fetchBlogsByTopic(topic);
        setAllBlog(fetchedBlogs)
    }

    return (
        <div className="bg-gray-100 dark:bg-zinc-800">
            <div className="flex justify-center max-w-7xl mx-auto py-20">
                <div className="min-h-screen flex flex-col justify-start w-3/4 relative dark:bg-zinc-800 mt-20">
                    <BlogsCard
                        loading={loading}
                        itemsPerPage={itemsPerPage}
                        allBlog={allBlog}
                    />
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalLength={totalLength}
                    />
                </div>
                <div className="mt-20 flex flex-col gap-10 w-1/4 ">
                    <AboutMe loading={loading} />
                    <RecentBlogs />
                    <Topics blogsByTopic={blogsByTopic} />
                </div>
            </div>
        </div>
    );
}

export default Home;
