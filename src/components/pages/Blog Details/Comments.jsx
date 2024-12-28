import { useState, useEffect, useCallback } from 'react'
import { loadComment } from '../../../services/blogs/comments/loadComment';
import { addComment } from '../../../services/blogs/comments/addComment';
import { updateComment } from '../../../services/blogs/comments/updateComment';
import { addLike } from '../../../services/blogs/comments/addLike';
import useSession from '../../../hooks/useSession';
import CommentModal from '../../layout/modal/comment/CommentModal';
import DeleteModal from '../../layout/modal/comment/DeleteModal';
import { averageRating, individualRating } from '../../../helpers/rating';
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { SlLike } from "react-icons/sl";
import Spinner from '../../animation/Spinner';
import moment from 'moment';
import { IoStarSharp } from "react-icons/io5";

function Comments({ blogId }) {
    const { session } = useSession();
    const [createComment, setCreateComment] = useState({
        content: "",
        commentId: null,
        isValidated: false,
        isDeleteModalOpen: false,
        loading: false,
        rating: "",
    });
    const [edit, setEdit] = useState({
        isEdit: false,
        commentId: null,
        content: '',
        loading: false,
    });
    const [allComments, setAllComments] = useState([]);
    const [ratingInfo, setRatingInfo] = useState(null);

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
    }, [fetchComments]);

    useEffect(() => {

        const ratingData = averageRating(allComments);
        setRatingInfo(ratingData);

    }, [allComments]);

    const submitComment = async (e) => {
        e.preventDefault();

        if (!session) {
            setCreateComment({ ...createComment, isValidated: true });
            return;
        }

        if (edit.isEdit && edit.content.trim() === '') {
            setEdit((prevState) => ({ ...prevState, isEdit: false, commentId: null, loading: false }));
            return;
        }

        if (edit.isEdit) {
            setEdit({ ...edit, loading: true });
            try {
                await updateComment(session, edit);
                fetchComments();
            } catch (error) {
                console.error("Failed to update comment:", error);
            } finally {
                setEdit((prevState) => ({ ...prevState, isEdit: false, content: '', rating: "", commentId: null, loading: false }));
            }
            return
        }

        setCreateComment({ ...createComment, loading: true });

        try {
            await addComment(session, createComment, blogId);
            fetchComments();
        } catch (error) {
            console.error("Failed to submit comment:", error);
        } finally {
            setCreateComment({ ...createComment, content: "", loading: false, rating: "" });
        }
    };

    const handleDeleteComment = useCallback(async (id) => {
        setCreateComment({ ...createComment, isDeleteModalOpen: true, commentId: id });

    }, [createComment.commentId])

    const handleEdit = (commentId) => {
        setEdit((prevState) => ({ ...prevState, isEdit: true, commentId: commentId }))
    }

    const cancelEdit = () => {
        setEdit((prevState) => ({ ...prevState, isEdit: false, commentId: null }))
    }

    const handleLike = async (commentId) => {

        if (!session?.user?.id) {
            return;
        }

        try {
            await addLike(session, commentId);
            fetchComments();
        } catch (error) {
            console.error("Failed to like comment:", error);
        }
    }

    return (
        <div>
            <CommentModal
                createComment={createComment}
                setCreateComment={setCreateComment}
            />
            <DeleteModal
                createComment={createComment}
                setCreateComment={setCreateComment}
                fetchComments={fetchComments}
            />
            <div className='relative flex flex-1 justify-center items-center py-8 overflow-hidden'>
                <div className='border border-dashed border-zinc-300 dark:border-zinc-700 min-w-[100px] sm:min-w-[150px] md:min-w-[250px] lg:w-full'></div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='relative flex space-y-1 flex-col justify-center z-20 p-10'>
                        <span className='justify-center text-center dark:text-gray-400 text-2xl font-semibold'>{ratingInfo?.roundedRating ? ratingInfo?.roundedRating.toFixed(1) : "Not Rated"}</span>
                        <p className='flex justify-center items-center gap-2 text-gray-600'>
                            {ratingInfo?.fullStars && ratingInfo?.fullStars.map((star, index) => (
                                <span key={index} className='text-yellow-400 dark:text-teal-500 text-lg'>{star}</span>
                            ))}
                            {ratingInfo?.emptyStars && ratingInfo?.emptyStars.map((star, index) => (
                                <span key={index} className='text-yellow-400 dark:text-teal-500 text-lg'>{star}</span>
                            ))}
                        </p>
                        <p className='text-gray-500 text-center whitespace-nowrap font-semibold text-lg'>{ratingInfo?.totalRating} {ratingInfo?.totalRating > 1 ? "Ratings" : "Rating"}</p>
                    </div>
                </div>
                <div className='border border-dashed border-zinc-300 dark:border-zinc-700 min-w-[100px] sm:min-w-[150px] md:min-w-[250px] lg:w-full'></div>
            </div>

            <div className=' px-4 py-6'>
                <form onSubmit={submitComment}>
                    <h1 className='text-2xl dark:text-gray-400 font-semibold'>Add a Review</h1>
                    <div className='mt-4'>
                        <label htmlFor="rating" className="mt-1 dark:text-gray-400 block text-lg">Rating</label>
                        <select id="rating" name="rating" value={createComment.rating} onChange={(e) => setCreateComment({ ...createComment, rating: Number(e.target.value) })} className="bg-white mt-2 border border-zinc-300 text-sm block w-[300px] px-2 py-2 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-teal-500 text-gray-500 dark:text-gray-400/50">
                            <option value="" disabled>Select a rating</option>
                            <option value={1}>1 Star</option>
                            <option value={2}>2 Star</option>
                            <option value={3}>3 Star</option>
                            <option value={4}>4 Star</option>
                            <option value={5}>5 Star</option>
                        </select>
                    </div>
                    <div className='mt-4'>
                        <p className="text-lg dark:text-gray-400">Leave a comment</p>
                        <textarea id="message" required value={createComment.content} onChange={(e) => setCreateComment({ ...createComment, content: e.target.value })} rows="4" className="block mt-2 p-2.5 w-full text-sm dark:text-gray-400 bg-gray-50 border border-zinc-300 dark:border-zinc-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900/50 dark:placeholder-gray-400/50 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add your comment..."></textarea>
                        <div className="flex justify-end">
                            <button className="mt-4 inline-flex gap-2 items-center w-[200px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                                {createComment.loading ? <><Spinner /> Processing...</> : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* all comments section */}

            <div className='mt-2'>
                <p className="text-xl dark:text-gray-400 border-b border-zinc-300 dark:border-zinc-700 py-4 tracking-normal font-semibold">{allComments.length > 1 ? "Comments" : "Comment"} <span className='ml-1 border px-2 py-1 border-zinc-300 dark:border-zinc-700 font-normal bg-white dark:bg-zinc-900/50'>{allComments.length}</span></p>
            </div>
            <div className='mt-4'>
                <ul className='max-h-[1000px] w-full overflow-y-auto p-2'>
                    {allComments && allComments.map((comment, index) => (
                        <li key={index} className='flex gap-4 py-6 border-b border-zinc-300 dark:border-zinc-700'>
                            <div>
                                {comment.avatar_url ? <img src={comment.avatar_url} alt='user' className='w-12 h-12 rounded-full object-cover ring-2 ring-blue-500 dark:ring-teal-500' /> : <FaUserCircle className='w-10 h-10' />}
                            </div>
                            <div className='flex justify-between w-full'>
                                <div className='flex flex-col w-full'>
                                    <div className='inline-flex items-center gap-2'>
                                        {comment.profiles && <p className='font-semibold dark:text-gray-400'>{comment.profiles.username}</p>}
                                        <MdOutlineAccessTime className='mt-1 text-gray-800/50 dark:text-gray-400/50 text-sm' />
                                        <span className='text-[12px] mt-1 text-gray-800/50 dark:text-gray-400/50'>{moment(comment.created_at).fromNow()}</span>
                                    </div>
                                    <div className='w-full mt-1'>
                                        {edit.isEdit && edit.commentId === comment.id ? <textarea id="message" required defaultValue={comment.id === edit.commentId ? comment.content : null} onChange={(e) => setEdit((prevState) => ({ ...prevState, content: e.target.value }))} rows="4" className="block p-2.5 w-full text-sm dark:text-gray-400 bg-gray-50 border border-zinc-300 dark:border-zinc-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900/50 dark:placeholder-gray-400/50 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add your comment..."></textarea> : <p className='text-[14px] font-normal text-gray-900 dark:text-gray-400'>{comment.content}</p>}
                                    </div>
                                    {edit.isEdit && edit.commentId === comment.id ?
                                        <div className='w-full flex gap-4 justify-end'>
                                            <button onClick={cancelEdit} className="mt-2 inline-flex gap-2 items-center w-[150px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">Cancel</button>
                                            <button onClick={submitComment} className="mt-2 inline-flex items-center gap-2 w-[150px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500"> {edit.loading ? <><Spinner /> Processing...</> : "Submit"}</button>
                                        </div>
                                        :
                                        <div className='flex gap-2 items-center mt-2'>
                                            <button className='inline-flex items-center gap-2' onClick={() => handleLike(comment.id)} ><SlLike className={`${comment.likes.some((like) => like.user_id === session?.user?.id) ? 'text-blue-500 dark:text-teal-500' : 'text-gray-500 hover:text-blue-500 dark:hover:text-teal-500'}`} />
                                            </button>
                                            {comment.likes.length > 0 && <span className='text-sm text-blue-600 dark:text-teal-500'> {comment.likes.length} </span>}
                                            {session?.user?.id === comment.profiles.id && <button onClick={() => handleEdit(comment.id)} className='ml-4 text-sm text-gray-500 hover:text-blue-500 dark:hover:text-teal-500'>Edit</button>}
                                            {session?.user?.id === comment.profiles.id && <button onClick={() => handleDeleteComment(comment.id)} className='ml-2 text-sm text-gray-500 hover:text-blue-500 dark:hover:text-teal-500'>Delete</button>}
                                        </div>
                                    }
                                </div>
                                {comment.rating &&
                                    <div className=' mt-1'>
                                        <p className='font-semibold dark:text-gray-400 flex gap-1'>
                                            {individualRating(comment.rating).fullStars.map((star, index) => (
                                                <span key={index} className='text-yellow-400 dark:text-teal-500'>{star}</span>
                                            ))}
                                            {individualRating(comment.rating).emptyStars.map((star, index) => (
                                                <span key={index} className='text-yellow-400 dark:text-teal-500'>{star}</span>
                                            ))}
                                        </p>
                                    </div>
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Comments