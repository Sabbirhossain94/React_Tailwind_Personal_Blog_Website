import React from 'react'
import { CardSkeleton } from '../../layout/skeleton/Skeleton'
import { Link } from 'react-router-dom'
import { blogCoverUrl } from '../../../helpers/storage';
import { BsArrowRight } from "react-icons/bs";

function BlogsCard({ loading, blogs }) {
    return (
        <div className="flex flex-wrap gap-8">
            {loading ? (
                Array(4)
                    .fill(null)
                    .map((_, index) => <CardSkeleton key={index} />)
            ) : (
                blogs.main.length === 0 ?
                    <div className="min-h-screen text-4xl font-semibold flex justify-center items-center w-full"> No Blogs Found!</div> :
                    blogs.main.map((blog, index) => (
                        <div key={index} className="relative w-[400px] rounded-md">
                            <div

                                className="flex flex-col border border-zinc-300 dark:border-gray-100/10"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-48 w-full object-cover"
                                        src={`${blogCoverUrl}/${blog.thumbnail}`}
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
                                                <Link to={`/blog/${blog.slug}`}>
                                                    <button className="bg-zinc-200 flex items-center group bg-blue-400/10 hover:bg-blue-400/20 dark:bg-teal-500/10 text-blue-500 dark:text-teal-500 text-md px-4  py-2 cursor-pointer dark:hover:bg-teal-500/30 transition duration-300">
                                                        <span>Read more</span>
                                                        <BsArrowRight className='ml-2 mt-1 translate-x-0 group-hover:translate-x-2 transition-transform duration-300' />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            )}
        </div>
    )
}

export default BlogsCard