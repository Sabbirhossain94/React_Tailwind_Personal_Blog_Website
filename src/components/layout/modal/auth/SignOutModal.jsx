import { useState } from 'react';
import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'
import { signOut } from '../../../../services/auth/signOut';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../animation/Spinner';

function SignOutModal({ isOpen, setIsOpen }) {
    const [loading, setLoading] = useState(false)
    const redirect = useNavigate();

    const handleDelete = () => {
        setLoading(true)
        setTimeout(() => {
            signOut(redirect)
            setLoading(false)
            setIsOpen(false);
        }, 1000)
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <DialogBackdrop className="fixed inset-0 backdrop-blur-sm bg-black/30" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border dark:border-zinc-700 bg-white dark:bg-zinc-800 p-8">
                    <DialogTitle className="font-bold dark:text-gray-200">Sign Out</DialogTitle>
                    <p className='text-gray-700 dark:text-gray-400'>Are you sure you want to sign out from your account?</p>
                    <div className="flex gap-4 mt-4">
                        <button className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 sm:w-auto" onClick={() => setIsOpen(false)}>Cancel</button>
                        <button
                            onClick={handleDelete}
                            className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 gap-2 sm:w-auto">{loading ? <><Spinner /> Processing...</> : "Sign out"}</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default SignOutModal