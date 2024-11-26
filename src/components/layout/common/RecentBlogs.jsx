import { useState, useEffect } from 'react'
import { fetchRecentBlogs } from '../../../services/recentBlogs';
import { Link } from 'react-router-dom';

function RecentBlogs() {
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecentBlogs({
            setLoading,
            setRecentBlogs
        })
    }, []);

    return (
        <div className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 p-4 flex flex-col justify-start">
            <div className="text-2xl dark:text-gray-200 font-semibold">{loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div> : 'Recent Blogs'}</div>
            <ul className="mt-4 space-y-3">
                {loading ? Array(4).fill(null).map((_, index) => <div key={index} className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>) : recentBlogs && recentBlogs.map((blog, key) => (
                    <li key={key} className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                        <Link to={`/blog/${blog.slug}`}>
                            {blog.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecentBlogs