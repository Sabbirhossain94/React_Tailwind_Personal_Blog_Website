import Spinner from '../../../animation/Spinner'

function Review({ submitComment, createComment, setCreateComment }) {
    return (
        <div className='py-6'>
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
    )
}

export default Review