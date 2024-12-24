import { useState, useEffect, useCallback } from 'react'
import { createComment } from '../../../services/blogs/addComment';
import useSession from '../../../hooks/useSession';
import CommentModal from '../../layout/modal/comment/CommentModal';
import DeleteModal from '../../layout/modal/comment/DeleteModal';
import { loadComment } from '../../../services/blogs/loadComment';
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import Spinner from '../../animation/Spinner';
import { SlLike } from "react-icons/sl";

function Comments({ blogId }) {
    const { session } = useSession();
    const [comments, setComments] = useState("");
    const [selectedComment, setSelectedComment] = useState(null);
    const [allComments, setAllComments] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchComments = useCallback(async () => {
        if (blogId === undefined) return;
        try {
            const commentsData = await loadComment(blogId);
            setAllComments(commentsData);
        } catch (error) {
            console.error("Failed to load comments:", error);
        }
    }, [blogId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments, selectedComment]);

    const submitComment = async (e) => {
        e.preventDefault();
        if (!session) {
            setIsOpen(true);
            return;
        }
        setLoading(true);
        try {
            await createComment(session, comments, blogId);
            setComments("");
            fetchComments();
        } catch (error) {
            console.error("Failed to submit comment:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = useCallback(async (commentId) => {
        setIsDeleteModalOpen(true);
        setSelectedComment(commentId)
    }, [selectedComment])


    return (
        <div className="mt-6">
            <CommentModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <DeleteModal
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                selectedComment={selectedComment}
                setSelectedComment={setSelectedComment}
            />
            <p className="text-xl dark:text-gray-400">Leave a comment</p>
            <div className="mt-2">
                <form onSubmit={submitComment}>
                    <textarea id="message" required value={comments} onChange={(e) => setComments(e.target.value)} rows="4" className="block p-2.5 w-full text-sm dark:text-gray-400 bg-gray-50 border border-zinc-300 dark:border-zinc-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900/50 dark:placeholder-gray-400/50 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add your comment..."></textarea>
                    <div className="flex justify-end">
                        <button className="mt-4 inline-flex gap-2 items-center w-[200px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                            {loading ? <><Spinner /> Processing...</> : "Submit"}
                        </button>
                    </div>
                </form>
            </div>

            {/* all comments section */}

            <div className='mt-2'>
                <p className="text-xl dark:text-gray-400 border-b border-zinc-300 dark:border-zinc-700 py-2  tracking-normal">Comments <span>({allComments.length})</span></p>
            </div>
            <div className='mt-4'>
                <ul className=''>
                    {allComments && allComments.map((comment, index) => (
                        <li key={index} className='flex gap-4 py-6 border-b border-zinc-300 dark:border-zinc-700'>
                            <div>
                                {comment.avatar_url ? <img src={comment.avatar_url} alt='user' className='w-12 h-12 rounded-full ring-2 ring-blue-500 dark:ring-teal-500' /> : <FaUserCircle className='w-10 h-10' />}
                            </div>
                            <div className='flex flex-col items-start gap-2'>
                                <div className='inline-flex items-center gap-2'>
                                    {comment.profiles && <p className='font-semibold dark:text-gray-400'>{comment.profiles.username}</p>}
                                    <MdOutlineAccessTime className='mt-1 text-gray-800/50 dark:text-gray-400/50 text-sm' />
                                    <span className='text-[12px] mt-1 text-gray-800/50 dark:text-gray-400/50'>{comment.created_at}</span>
                                </div>
                                <div>
                                    <p className='text-[14px] font-normal text-gray-900 dark:text-gray-400'>{comment.content}</p>
                                </div>
                                <div className='flex gap-4 items-center mt-2'>
                                    <SlLike className='text-sm text-gray-500 cursor-pointer' />
                                    {session?.user?.id === comment.profiles.id && <p className='text-sm text-gray-500 cursor-pointer'>Edit</p>}
                                    {session?.user?.id === comment.profiles.id && <button onClick={() => handleDeleteComment(comment.id)} className='text-sm text-gray-500 hover:text-blue-500 dark:hover:text-teal-500'>Delete</button>}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Comments