import { useState } from "react";
import useFetchBlogs from '../../../hooks/useFetchBlogs'
import { TableSkeleton } from '../../layout/skeleton/Skeleton';
import { Link } from 'react-router-dom';
import { deleteBlogs } from "../../../services/deleteBlogs";
import Modal from "../../layout/modal/Modal";

function Posts() {
  const { loading, blogs, totalBlogs } = useFetchBlogs();
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div >
      <div className='flex justify-end'>
        <Link to="/dashboard/createblog">
          <button className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Create new
          </button>
        </Link>
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        deleteBlogs={deleteBlogs}
        selectedBlogId={selectedBlogId}
      />
      <div className="relative overflow-x-auto border border-zinc-300 dark:border-zinc-700 mt-4">
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-200">
          <thead className="text-xs border-b border-zinc-300 dark:border-zinc-700 h-[20px] uppercase bg-white dark:bg-zinc-900/50 dark:text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Blog title'}
              </th>
              <th scope="col" className="px-6 py-3">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Introduction'}
              </th>
              <th scope="col" className="px-6 py-3">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Created at'}
              </th>
              <th scope="col" className="px-6 py-3">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Updated at'}
              </th>
              <th scope="col" className="px-6 py-3">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Action'}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? Array(totalBlogs)
              .fill(null)
              .map((_, index) => <TableSkeleton key={index} />)
              :
              blogs.map((blog, key) => (
                <tr key={key} className="odd:bg-gray-100 dark:text-gray-400 odd:dark:bg-zinc-800 even:bg-white even:dark:bg-zinc-900/50 border-b dark:border-zinc-700">
                  <td className="px-6 py-4 font-medium whitespace-nowrap ">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4 w-1/3">
                    {blog.introduction}
                  </td>
                  <td className="px-6 py-4">
                    {blog.inserted_at}
                  </td>
                  <td className="px-6 py-4">
                    coming soon!
                  </td>
                  <td className="px-6 py-4 ">
                    <button onClick={() => {
                      setIsOpen(true);
                      setSelectedBlogId(blog.id)
                    }
                    } className="h-8 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 sm:w-auto">
                      Delete
                    </button>
                    <Link
                      to={`/dashboard/blog/${blog.slug}/update`}
                    >
                      <button className="h-8 ml-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 sm:w-auto">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Posts