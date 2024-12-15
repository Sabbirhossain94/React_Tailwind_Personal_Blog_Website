import { useState } from "react";
import useFetchBlogs from "../../../../hooks/useFetchBlogs";
import { TableSkeleton } from "../../../layout/skeleton/Skeleton"
import { Link } from 'react-router-dom';
import DeleteModal from "../../../layout/modal/DeleteModal"
import PostsTable from "./PostsTable";

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
        <div className="flex flex-col">
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
            <div className="relative border border-zinc-300 dark:border-zinc-700 mt-4 overflow-y-auto">
                <PostsTable
                    loading={loading}
                    handleCheckboxChange={handleCheckboxChange}
                    handleSelectAll={handleSelectAll}
                    blogs={blogs}
                    selectedBlogId={selectedBlogId}
                    totalBlogs={totalBlogs}
                    setIsOpen={setIsOpen}
                    setSingleBlogId={setSingleBlogId}
                />
            </div>
        </div>
    )
}

export default Posts