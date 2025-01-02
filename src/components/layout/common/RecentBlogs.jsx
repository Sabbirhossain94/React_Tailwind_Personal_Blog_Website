import { useState, useEffect } from 'react'
import { fetchRecentBlogs } from '../../../services/blogs/fetchRecentBlogs';
import { Link } from 'react-router-dom';
import { RecentBlogsSkeleton } from '../../layout/skeleton/Skeleton';
import { blogCoverUrl } from '../../../helpers/storage';
import moment from 'moment';

function RecentBlogs() {
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecentBlogs({
            setLoading,
            setRecentBlogs
        })
    }, []);

    return loading ? <RecentBlogsSkeleton /> : (
        <div className="border sm:col-span-2 md:col-span-1 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 p-4 flex flex-col justify-start">
            <div className="text-2xl dark:text-gray-200 font-semibold">Recent Blogs</div>
            <ul className="mt-4 flex flex-col gap-4">
                {recentBlogs && recentBlogs.map((blog, key) => (
                    <Link key={key} to={`/blog/${blog.slug}`}>
                        <li className="text-gray-800 hover:text-blue-500 flex gap-2 dark:hover:text-teal-500 transition duration-300 dark:text-gray-400">
                            <img src={`${blogCoverUrl}/${blog.thumbnail}`} alt="thumbnail" className='h-16 w-16 object-center object-fit' />
                            <div className='flex flex-col justify-center'>
                                <p className='text-[14px]'>
                                    {blog.title}
                                </p>
                                <p>
                                    <span className="text-[12px] dark:text-teal-600 text-blue-500">
                                        {moment(blog.inserted_at).format("MMMM D, YYYY")}
                                    </span>
                                </p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default RecentBlogs