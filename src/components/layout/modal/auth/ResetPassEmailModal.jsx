import { useState } from 'react'
import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'
import Spinner from '../../../animation/Spinner'
import { resetPass } from '../../../../services/auth/resetPass'

function ResetPassEmailModal({ isResetEmailModalOpen, setIsResetEmailModalOpen }) {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await resetPass(email)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
            setIsResetEmailModalOpen(false);
            setEmail("")
        }
    }

    const handleModalClose = () => {
        setIsResetEmailModalOpen(false)
        setEmail("")
    }

    return (
        <Dialog
            open={isResetEmailModalOpen}
            onClose={handleModalClose}
            className="relative z-50"
        >
            <DialogBackdrop className="fixed inset-0 backdrop-blur-sm bg-black/30" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6">
                    <DialogTitle className="font-bold dark:text-gray-200">Forgot Password?</DialogTitle>
                    <p className='text-gray-700 dark:text-gray-400'>Enter your email address to get password reset link</p>
                    <div className="flex flex-col w-full gap-4 mt-4">
                        <form
                            onSubmit={handleResetPassword}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-md font-medium dark:text-gray-300 text-slate-900"
                                >
                                    Email address
                                </label>
                                <input
                                    required
                                    id="email"
                                    className="mt-2 focus:border-blue-500 block w-full dark:text-gray-400 appearance-none border dark:bg-zinc-900/90 dark:border-gray-200/20 border-gray-300 px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-400 shadow-sm sm:text-sm"
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='flex gap-4 mt-4 justify-end'>
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 sm:w-auto">Cancel</button>
                                <button type="submit" className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 gap-2 sm:w-auto">{loading ? <><Spinner /> Processing...</> : "Send Reset Link"}</button>
                            </div>
                        </form>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default ResetPassEmailModal