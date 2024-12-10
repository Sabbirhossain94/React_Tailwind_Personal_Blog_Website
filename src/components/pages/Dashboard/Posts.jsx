import { useState } from "react";
import useFetchBlogs from '../../../hooks/useFetchBlogs'
import { TableSkeleton } from '../../layout/skeleton/Skeleton';
import { Link } from 'react-router-dom';
import DeleteModal from "../../layout/modal/DeleteModal";

function Posts() {
  const { loading, blogs, totalBlogs } = useFetchBlogs();
  const [singleBlogId, setSingleBlogId] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState([])
  let [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (blogId, isChecked) => {
    setSelectedBlogId((prevSelectedIds) => isChecked ? [...prevSelectedIds, blogId] : prevSelectedIds.filter((itemId) => itemId !== blogId))
  }

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedBlogId(blogs.map((blog) => blog.id));
    } else {
      setSelectedBlogId([]);
    }
  };

  return (
    <div >
      <div className='flex justify-end gap-6'>
        {selectedBlogId.length > 0 && <button onClick={() => setIsOpen(true)} className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900/50 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
          Delete selected
        </button>}
        <Link to="/dashboard/createblog">
          <button className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900/50 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Create new
          </button>
        </Link>

      </div>
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        singleBlogId={singleBlogId}
        selectedBlogId={selectedBlogId}
        setSelectedBlogId={setSelectedBlogId}
      />
      <div className="relative overflow-x-auto border border-zinc-300 dark:border-zinc-700 mt-4 overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-200">
          <thead className="border-b border-zinc-300 dark:border-zinc-700 h-[20px] uppercase text-white dark:text-gray-800 bg-blue-500 dark:bg-teal-500 dark:bg-zinc-900/50">
            <tr>
              <th scope="col" className="pl-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedBlogId.length === blogs.length && blogs.length > 0}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-6 text-[14px]">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Blog title'}
              </th>
              <th scope="col" className="px-6 py-6 text-[14px]">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Introduction'}
              </th>
              <th scope="col" className="px-6 py-6 text-[14px]">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Topic'}
              </th>
              <th scope="col" className="px-6 py-6 text-[14px]">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Created at'}
              </th>
              <th scope="col" className="px-6 py-6 text-[14px]">
                {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Updated at'}
              </th>
              <th scope="col" className="px-6 py-6 text-[14px]">
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
                <tr key={key} className="bg-white dark:text-gray-400 dark:bg-zinc-900/50 border-b dark:border-zinc-700">
                  <td className="w-4 pl-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-${blog.id}`}
                        onChange={(e) => handleCheckboxChange(blog.id, e.target.checked)}
                        checked={selectedBlogId.includes(blog.id)}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor={`checkbox-table-${blog.id}`} className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap ">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4 w-1/3">
                    {blog.introduction}
                  </td>
                  <td className="px-6 py-4">
                    {blog.topic}
                  </td>
                  <td className="px-6 py-4">
                    {blog.inserted_at}
                  </td>
                  <td className="px-6 py-4">
                    {blog.updated_at}
                  </td>
                  <td className="px-6 py-4 ">
                    <button onClick={() => {
                      setIsOpen(true);
                      setSingleBlogId(blog.id)
                    }
                    } className="h-8 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 sm:w-auto">
                      Delete
                    </button>
                    <Link
                      to={`/dashboard/blog/${blog.slug}/update`}
                    >
                      <button className="h-8 ml-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 sm:w-auto">
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