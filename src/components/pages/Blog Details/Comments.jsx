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

function Comments({ blogId }) {
    const { session } = useSession();
    const [createComment, setCreateComment] = useState({
        content: "",
        commentId: null,
        isSignInModalOpen: false,
        isDeleteModalOpen: false,
        loading: false,
        rating: "",
        message: ""
    });
    const [edit, setEdit] = useState({
        isEdit: false,
        commentId: null,
        content: '',
        rating: "",
        loading: false,
    });
    const [filter, setFilter] = useState({
        sortBy: "latest",
        rating: ""
    })

    const [allComments, setAllComments] = useState([]);
    const [ratingInfo, setRatingInfo] = useState(null);

    const fetchComments = useCallback(async () => {

        if (blogId === undefined) return;

        try {
            const commentsData = await loadComment(blogId, filter);
            setAllComments(commentsData);
        } catch (error) {
            console.error("Failed to load comments:", error);
        }

    }, [blogId, filter]);

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
            setCreateComment({ ...createComment, isSignInModalOpen: true, message: "" });
            return;
        }

        if (edit.isEdit && edit.content.trim() === '' && edit.rating === "") {
            alert()
            setEdit((prevState) => ({ ...prevState, isEdit: false, content: "", commentId: null, rating: "", loading: false }));
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
        setEdit((prevState) => ({ ...prevState, isEdit: false, rating: "", content: "", commentId: null }))
    }

    const handleLike = async (commentId) => {

        if (!session?.user?.id) {
            setCreateComment({ ...createComment, isSignInModalOpen: true, message: "You need to be logged in to add a like" });
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

            {/* Rating  */}
            <div className='relative flex flex-1 justify-center items-center pt-8 overflow-hidden'>
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

            {/* Review  */}
            <div className=' py-6'>
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
                        <textarea autoFocus id="message" required value={createComment.content} onChange={(e) => setCreateComment({ ...createComment, content: e.target.value })} rows="4" className="block mt-2 p-2.5 w-full text-sm dark:text-gray-400 bg-white border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/50 dark:placeholder-gray-400/50 focus:border-blue-500" placeholder="Add your comment..."></textarea>
                        <div className="flex justify-end">
                            <button className="mt-4 inline-flex gap-2 items-center w-[200px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                                {createComment.loading ? <><Spinner /> Processing...</> : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* all comments section */}

            <div className='mt-10 py-4 sm:py-0 flex flex-col sm:flex-row w-full border-b border-zinc-300 dark:border-zinc-700 sm:justify-between'>
                <p className="text-xl dark:text-gray-400  py-4 tracking-normal font-semibold">Comments
                    <span className='ml-2 border px-2 py-1 border-zinc-300 dark:border-zinc-700 font-normal bg-white dark:bg-zinc-900/50'>{allComments.length}</span>
                </p>

                {/* filter  */}
                <div className='flex gap-4 flex-wrap'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="rating" className="dark:text-gray-400 block text-md">Filter By</label>
                        <select id="rating" name="rating" value={filter.rating ?? ""} onChange={(e) => setFilter({ ...filter, rating: Number(e.target.value) })} className="bg-white border border-zinc-300 text-sm block w-[135px] px-2 py-2 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-teal-500 text-gray-500 dark:text-gray-400">
                            <option value="" disabled>Select a rating</option>
                            <option value={0}>All Reviews</option>
                            <option value={1}>1 Star</option>
                            <option value={2}>2 Star</option>
                            <option value={3}>3 Star</option>
                            <option value={4}>4 Star</option>
                            <option value={5}>5 Star</option>
                            <option value={6}>No Rating</option>
                        </select>
                    </div>

                    {/* sort  */}
                    <div className='flex items-center gap-2'>
                        <p className='text-black dark:text-gray-400 text-md'>Sort by</p>
                        <select value={filter.sortBy} onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })} className="bg-white border px-4 border-zinc-300 text-sm block w-[100px] py-2 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-teal-500 text-gray-500 dark:text-gray-400">
                            <option value="latest">Latest </option>
                            <option value="oldest">Oldest </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <ul className='max-h-[1000px] w-full overflow-y-auto p-1'>
                    {allComments.length > 0 ? allComments.map((comment, index) => (
                        <li key={index} className='flex flex-row py-6 border-b border-zinc-300 dark:border-zinc-700'>
                            <div className='w-full flex flex-col sm:flex-row gap-1 xl:gap-2'>
                                <div className='w-[60px] flex items-start xl:justify-center'>
                                    {comment.avatar_url ? <img src={comment.avatar_url} alt='user' className='w-12 h-12 rounded-full object-cover ring-2 ring-blue-500 dark:ring-teal-500' /> : <FaUserCircle className='w-10 h-10' />}
                                </div>
                                <div className='flex flex-col w-full'>
                                    <div className='inline-flex items-center gap-2'>
                                        {comment.profiles && <p className='font-semibold dark:text-gray-400 whitespace-nowrap'>{comment.profiles.username}</p>}
                                        <MdOutlineAccessTime className='mt-1 text-gray-800/50 dark:text-gray-400/50 text-sm' />
                                        <span className='text-[12px] whitespace-nowrap mt-1 text-gray-800/50 dark:text-gray-400/50'>{moment(comment.created_at).fromNow()}</span>
                                    </div>
                                    {/* edit */}
                                    <div className='w-full mt-1'>
                                        {edit.isEdit && edit.commentId === comment.id ?
                                            <>
                                                <div className='mt-4'>
                                                    <label htmlFor="rating" className=" dark:text-gray-400 block text-sm">Edit Rating</label>
                                                    <select id="rating" name="rating" defaultValue={comment.rating ?? ""} onChange={(e) => setEdit({ ...edit, rating: Number(e.target.value) })} className="bg-white mt-1 border border-zinc-300 text-sm block w-[300px] px-2 py-2 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-teal-500 text-gray-500 dark:text-gray-400/50">
                                                        <option value="" disabled>Select a rating</option>
                                                        <option value={0}>No Rating</option>
                                                        <option value={1}>1 Star</option>
                                                        <option value={2}>2 Star</option>
                                                        <option value={3}>3 Star</option>
                                                        <option value={4}>4 Star</option>
                                                        <option value={5}>5 Star</option>
                                                    </select>
                                                </div>
                                                <p className="text-sm dark:text-gray-400 mt-4">Edit comment</p>
                                                <textarea id="comment" autoFocus required defaultValue={comment.id === edit.commentId ? comment.content : null} onChange={(e) => setEdit((prevState) => ({ ...prevState, content: e.target.value }))} rows="4" className="block mt-1 p-2.5 w-full text-sm dark:text-gray-400 bg-white border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/50 dark:placeholder-gray-400/50" placeholder="Add your comment...">
                                                </textarea>
                                            </>
                                            : <p className='text-[14px] font-normal text-gray-900 dark:text-gray-400'>{comment.content}
                                            </p>
                                        }
                                    </div>
                                    {edit.isEdit && edit.commentId === comment.id ?
                                        <div className='w-full flex gap-4 justify-end'>
                                            <button onClick={cancelEdit} className="mt-2 inline-flex gap-2 items-center w-[150px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">Cancel</button>
                                            <button onClick={submitComment} className="mt-2 inline-flex items-center gap-2 w-[150px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500"> {edit.loading ? <><Spinner /> Processing...</> : "Submit"}</button>
                                        </div>
                                        :
                                        <div className='flex items-center mt-2'>
                                            <button className='inline-flex items-center gap-2' onClick={() => handleLike(comment.id)} >
                                                <SlLike className={`${comment.likes.some((like) => like.user_id === session?.user?.id) ? 'text-blue-500 dark:text-teal-500' : 'text-gray-500 hover:text-blue-500 dark:hover:text-teal-500'}`} />
                                            </button>
                                            {comment.likes.length > 0 && <span className='ml-2 text-sm text-blue-600 dark:text-teal-500'> {comment.likes.length} </span>}
                                            {session?.user?.id === comment.profiles.id && <button onClick={() => handleEdit(comment.id)} className='mt-[0.5px] ml-3 text-sm text-gray-500 hover:text-blue-500 dark:hover:text-teal-500'>Edit</button>}
                                            {session?.user?.id === comment.profiles.id && <button onClick={() => handleDeleteComment(comment.id)} className='mt-[0.5px] ml-3 text-sm text-gray-500 hover:text-blue-500 dark:hover:text-teal-500'>Delete</button>}
                                        </div>
                                    }
                                </div>
                            </div>
                            {comment.rating && <div className={`${edit.isEdit && edit.commentId === comment.id && "hidden"} block`}>
                                <p className='font-semibold dark:text-gray-400 flex gap-1'>
                                    {individualRating(comment.rating).fullStars.map((star, index) => (
                                        <span key={index} className='text-yellow-400 dark:text-teal-500'>{star}</span>
                                    ))}
                                    {individualRating(comment.rating).emptyStars.map((star, index) => (
                                        <span key={index} className='text-yellow-400 dark:text-teal-500'>{star}</span>
                                    ))}
                                </p>
                            </div>}
                        </li>
                    )) : <li className='text-center text-xl py-6 dark:text-gray-400'>No Comments Found!</li>}
                </ul>
            </div>
        </div>
    )
}

export default Comments