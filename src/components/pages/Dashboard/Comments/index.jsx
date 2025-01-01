import { useState } from "react";
import TableData from "./TableData"
import useComments from "../../../../hooks/useComments"
import DeleteCommentModal from "../../../layout/modal/dashboard/DeleteCommentModal";

function Comments() {
    const { loading: commentLoading, comments, refetch } = useComments();
    const [selectedCommentId, setSelectedCommentId] = useState([]);
    const [isSingleDelete, setIsSingleDelete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCheckboxChange = (commentId, isChecked) => {
        setSelectedCommentId((prevSelectedIds) => isChecked ? [...prevSelectedIds, commentId] : prevSelectedIds.filter((itemId) => itemId !== commentId))
    }

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelectedCommentId(comments?.all?.map((comment) => comment.id));
        } else {
            setSelectedCommentId([]);
        }
    };

    return (
        <div className="relative border-zinc-300 dark:border-zinc-700 flex flex-col">
            <div className='flex justify-end h-10'>
                {selectedCommentId.length > 0 && !isSingleDelete && <button onClick={() => setIsModalOpen(true)} className="cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900/50 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 sm:w-auto">
                    Delete selected ({selectedCommentId.length})
                </button>}
            </div>
            <DeleteCommentModal
                isModalOpen={isModalOpen}
                refetch={refetch}
                setIsModalOpen={setIsModalOpen}
                selectedCommentId={selectedCommentId}
                setSelectedCommentId={setSelectedCommentId}
                isSingleDelete={isSingleDelete}
                setIsSingleDelete={setIsSingleDelete}
            />
            <div className="overflow-y-auto mt-4 max-h-[750px]">
                <TableData
                    comments={comments}
                    commentLoading={commentLoading}
                    handleCheckboxChange={handleCheckboxChange}
                    handleSelectAll={handleSelectAll}
                    selectedCommentId={selectedCommentId}
                    setSelectedCommentId={setSelectedCommentId}
                    setIsModalOpen={setIsModalOpen}
                    isSingleDelete={isSingleDelete}
                    setIsSingleDelete={setIsSingleDelete}
                />
            </div>
        </div>
    )
}

export default Comments