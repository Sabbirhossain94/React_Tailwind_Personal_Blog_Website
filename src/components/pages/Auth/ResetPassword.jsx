import { useState } from "react";
import { passwordUpdate } from "../../../services/auth/updatePassword";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Spinner from "../../animation/Spinner";
import toast from "react-hot-toast";

function ResetPassword() {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [visibility, setVisibility] = useState({
        newPassword: false,
        confirmPassword: false
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords do not match!")
        } else {
            setLoading(true)
            try {
                await passwordUpdate(formData.newPassword, navigate)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 dark:bg-zinc-800">
            <div className="mt-4 mx-auto w-full px-6 md:px-0 md:max-w-lg">
                <div className="bg-white dark:bg-zinc-900 py-8 px-4 border border-zinc-300 dark:border-zinc-700">
                    <h2 className="text-center text-2xl font-bold tracking-tight dark:text-gray-300 text-slate-900">
                        Reset Password
                    </h2>
                    <div className="mt-6 px-2">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="mt-4 relative">
                                <label
                                    htmlFor="password"
                                    className="block text-md font-medium dark:text-gray-300 text-slate-900"
                                >
                                    New Password
                                </label>
                                <input
                                    required
                                    id="password"
                                    className="mt-2 focus:border-blue-500 block w-full dark:text-gray-400 appearance-none border dark:bg-zinc-900/90 dark:border-gray-200/20 border-gray-300 px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-400 shadow-sm sm:text-sm"
                                    type={visibility.newPassword ? "text" : "password"}
                                    placeholder="Your new password"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                />
                                {visibility.newPassword ?
                                    <MdVisibility onClick={() => setVisibility({ ...visibility, newPassword: !visibility.newPassword })} className="cursor-pointer text-gray-500 absolute right-2 top-11" /> :
                                    <MdVisibilityOff onClick={() => setVisibility({ ...visibility, newPassword: !visibility.newPassword })} className="cursor-pointer text-gray-500 absolute right-2 top-11" />
                                }
                            </div>
                            <div className="mt-4 relative">
                                <label
                                    htmlFor="confirm_password"
                                    className="block text-md font-medium dark:text-gray-300 text-slate-900"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    required
                                    id="confirm_password"
                                    className="mt-2 focus:border-blue-500 block w-full dark:text-gray-400 appearance-none border dark:bg-zinc-900/90 dark:border-gray-200/20 border-gray-300 px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-400 shadow-sm sm:text-sm"
                                    type={visibility.confirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                                {visibility.confirmPassword ?
                                    <MdVisibility onClick={() => setVisibility({ ...visibility, confirmPassword: !visibility.confirmPassword })} className="cursor-pointer text-gray-500 absolute right-2 top-11" /> :
                                    <MdVisibilityOff onClick={() => setVisibility({ ...visibility, confirmPassword: !visibility.confirmPassword })} className="cursor-pointer text-gray-500 absolute right-2 top-11" />
                                }
                            </div>

                            <div className="mt-6">
                                <button className="flex items-center gap-2 w-full justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                                    {loading ? <><Spinner />Processing...</> : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ResetPassword