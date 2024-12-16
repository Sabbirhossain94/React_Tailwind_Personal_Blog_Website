import { useState } from "react"
import Spinner from "../../animation/Spinner";
import { Link } from "react-router-dom";
import { signUp } from "../../../services/auth/signUp";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

function SignUp() {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    })
    const [showVisibility, setShowVisibility] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault();
        await signUp(formData, setLoading)
    };

    return (
        <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 dark:bg-zinc-800">
            <div className="mt-4 mx-auto w-full px-6 md:px-0 md:max-w-lg">
                <div className="bg-white dark:bg-zinc-900 py-8 px-4 border border-zinc-300 dark:border-zinc-700">
                    <h2 className="text-center text-2xl font-bold tracking-tight dark:text-gray-300 text-slate-900">
                        Sign Up
                    </h2>
                    <p className="text-center mt-4">Already have an account? <Link to='/signin'><span className="text-blue-500 underline">Sign in</span></Link></p>
                    <div className="mt-4 px-2">
                        <form className="space-y-6"
                            onSubmit={handleSignup}
                        >
                            <div>
                                <label
                                    htmlFor="fullname"
                                    className="block text-md font-medium dark:text-gray-300 text-slate-900"
                                >
                                    Full name
                                </label>
                                <div className="mt-4">
                                    <input
                                        required
                                        id="fullname"
                                        className="inputField focus:border-blue-500 block w-full dark:text-gray-400 appearance-none border dark:bg-zinc-900/90 dark:border-gray-200/20 border-gray-300 px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-400 shadow-sm sm:text-sm"
                                        type="text"
                                        placeholder="Your full name"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                                <label
                                    htmlFor="email"
                                    className="block mt-4 text-md font-medium dark:text-gray-300 text-slate-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-4">
                                    <input
                                        required
                                        id="email"
                                        className="inputField focus:border-blue-500 block w-full dark:text-gray-400 appearance-none border dark:bg-zinc-900/90 dark:border-gray-200/20 border-gray-300 px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-400 shadow-sm sm:text-sm"
                                        type="email"
                                        placeholder="Your email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <label
                                    htmlFor="password"
                                    className="block text-md mt-4 font-medium dark:text-gray-300 text-slate-900"
                                >
                                    Password
                                </label>
                                <div className="mt-4 relative">
                                    <input
                                        required
                                        id="password"
                                        className="inputField focus:border-blue-500 block w-full dark:text-gray-400 appearance-none border dark:bg-zinc-900/90 dark:border-gray-200/20 border-gray-300 px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-400 shadow-sm sm:text-sm"
                                        type={showVisibility ? "text" : "password"}
                                        placeholder="Your password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    {showVisibility ?
                                        <MdVisibility onClick={() => setShowVisibility(!showVisibility)} className="cursor-pointer text-gray-500 absolute right-2 top-3" /> :
                                        <MdVisibilityOff onClick={() => setShowVisibility(!showVisibility)} className="cursor-pointer text-gray-500 absolute right-2 top-3" />
                                    }
                                </div>
                            </div>
                            <div>
                                <button className="flex items-center gap-2 w-full justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                                    {loading ? <><Spinner />Processing...</> : "Create an account"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp