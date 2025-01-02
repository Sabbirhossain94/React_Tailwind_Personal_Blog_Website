import { useCallback } from 'react';
import { CommentSkeleton } from '../../../layout/skeleton/Skeleton'
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { SlLike } from "react-icons/sl";
import moment from 'moment';
import { FaInbox } from "react-icons/fa";
import { individualRating } from '../../../../helpers/rating';
import Spinner from '../../../animation/Spinner';
import useSession from '../../../../hooks/useSession';

function List({ loading, isLiking, createComment, setCreateComment, allComments, edit, setEdit, submitComment, handleLike }) {

    const { session } = useSession();

    const handleEdit = (commentId) => {
        setEdit((prevState) => ({ ...prevState, isEdit: true, commentId: commentId }))
    }

    const handleDeleteComment = useCallback(async (id) => {
        setCreateComment({ ...createComment, isDeleteModalOpen: true, commentId: id });

    }, [createComment.commentId])

    const cancelEdit = () => {
        setEdit((prevState) => ({ ...prevState, isEdit: false, rating: "", content: "", commentId: null }))
    }

    return (
        <div className='mt-4'>
            <ul className='max-h-[1000px] w-full overflow-y-auto p-1'>
                {
                    loading && !isLiking ?
                        (Array(2)
                            .fill(null)
                            .map((_, index) => <CommentSkeleton key={index} />
                            ))
                        :
                        (
                            allComments.length > 0 ? allComments.map((comment, index) => (
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
                                                        <textarea id="comment" required defaultValue={comment.id === edit.commentId ? comment.content : null} onChange={(e) => setEdit((prevState) => ({ ...prevState, content: e.target.value }))} rows="4" className="block mt-1 p-2.5 w-full text-sm dark:text-gray-400 bg-white border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/50 dark:placeholder-gray-400/50" placeholder="Add your comment...">
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
                            )) : <li className='text-center text-xl dark:text-gray-400'>
                                <div className='flex justify-center py-10 dark:text-gray-400 px-2 font-medium border-zinc-300 dark:border-zinc-700'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <FaInbox className='text-7xl text-blue-500 dark:text-teal-500' />
                                        <p className='dark:text-gray-400 text-xl'>No Data</p>
                                    </div>
                                </div>
                            </li>
                        )}
            </ul>
        </div>
    )
}

export default List