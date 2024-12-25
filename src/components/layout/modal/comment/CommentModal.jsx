import React from 'react'
import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'
import { RiAlertFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

function CommentModal({ createComment, setCreateComment }) {

    return (
        <Dialog
            open={createComment.isValidated}
            onClose={() => setCreateComment({ ...createComment, isValidated: false })}
            className="relative z-50"
        >
            <DialogBackdrop className="fixed inset-0 backdrop-blur-sm bg-black/30" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border dark:border-zinc-700 bg-white dark:bg-zinc-800 p-8">
                    <DialogTitle className="font-bold dark:text-gray-200 flex justify-center"><RiAlertFill className='text-7xl text-red-500' /></DialogTitle>
                    <p className='dark:text-gray-400'>You need to be logged in to add a comment</p>
                    <div className="flex gap-4 justify-center mt-4">
                        <button className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 sm:w-auto" onClick={() => setCreateComment({ ...createComment, isValidated: false })}>Cancel</button>
                        <Link to="/signin">
                            <p
                                className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 gap-2 sm:w-auto">Sign In
                            </p>
                        </Link>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default CommentModal

