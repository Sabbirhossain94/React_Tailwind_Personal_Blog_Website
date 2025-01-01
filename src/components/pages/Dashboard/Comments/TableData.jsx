import moment from 'moment'
import { CommentsTableSkeleton } from '../../../layout/skeleton/Skeleton'
import { FaInbox } from "react-icons/fa";

function TableData({ comments, commentLoading, handleCheckboxChange, handleSelectAll, selectedCommentId, setSelectedCommentId, setIsModalOpen, isSingleDelete, setIsSingleDelete }) {
    return (
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-200 table-auto">
            <thead className="border-b border-zinc-300 dark:border-zinc-700 uppercase text-white dark:text-gray-800 bg-blue-500 dark:bg-teal-500 dark:bg-zinc-900/50">
                <tr>
                    <th scope="col" className="pl-4">
                        {
                            commentLoading ? <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-4"></div>
                                :
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all"
                                        type="checkbox"
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        checked={selectedCommentId.length === comments?.all?.length && comments?.all?.length && !isSingleDelete > 0}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-zinc-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-zinc-700" />
                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                </div>
                        }
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px]">
                        {commentLoading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Comment'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px]">
                        {commentLoading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Likes'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px] whitespace-nowrap">
                        {commentLoading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'User'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px] whitespace-nowrap">
                        {commentLoading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Blog Title'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px] whitespace-nowrap">
                        {commentLoading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Updated At'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px] whitespace-nowrap">
                        {commentLoading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Action'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {commentLoading ? (Array(5)
                    .fill(null)
                    .map((_, index) => <CommentsTableSkeleton key={index} />))
                    :
                    (comments?.all?.length > 0 ? (comments?.all?.map((comment, index) => (
                        <tr key={index} className="bg-white dark:text-gray-400 dark:bg-zinc-900/50 border-b dark:border-zinc-700">
                            <td className="w-4 pl-4">
                                <div className="">
                                    <input
                                        id={`checkbox-table-${comment.id}`}
                                        onChange={(e) => handleCheckboxChange(comment.id, e.target.checked)}
                                        checked={selectedCommentId.includes(comment.id) && !isSingleDelete}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label
                                        htmlFor={`checkbox-table-${comment.id}`}
                                        className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 break-words font-medium">
                                {comment.content}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {comment.likes.length === 0 ? 0 : comment.likes.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <p className='text-[14px] font-semibold'>{comment.profiles.username}</p>
                                <p className='text-[12px] font-medium text-gray-800 dark:text-gray-500'>{comment.profiles.email}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {comment.blogs.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {moment(comment.created_at).format("MMMM DD, YYYY")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => {
                                        setIsSingleDelete(true)
                                        setIsModalOpen(true);
                                        setSelectedCommentId([comment.id])
                                    }}
                                    className="h-full cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-1 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 sm:w-auto">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))) :
                        <tr className="border bg-white dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-700 w-full">
                            <td colSpan={7} className="h-64">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <FaInbox className="text-7xl text-blue-500 dark:text-teal-500" />
                                    <p className="dark:text-gray-400 text-xl">No Data</p>
                                </div>
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
}

export default TableData