import { useState } from "react";
import { signIn } from "../../../services/auth/signIn";
import Spinner from "../../animation/Spinner";
import { Link } from "react-router-dom";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showVisibility, setShowVisibility] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn(formData, setLoading)
  };


  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 dark:bg-zinc-800">
      <div className="mt-4 mx-auto w-full px-6 md:px-0 md:max-w-lg">
        <div className="bg-white dark:bg-zinc-900 py-8 px-4 border border-zinc-300 dark:border-zinc-700">
          <h2 className="text-center text-2xl font-bold tracking-tight dark:text-gray-300 text-slate-900">
            Sign In
          </h2>
          <p className="text-center dark:text-gray-400 mt-2">Don't have an account? <Link to='/signup'><span className="text-blue-500 dark:text-teal-500 underline">Sign up</span></Link></p>
          <div className="mt-6 px-2">
            <form  onSubmit={handleLogin}>
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="mt-4 relative">
                <label
                  htmlFor="password"
                  className="block text-md font-medium dark:text-gray-300 text-slate-900"
                >
                  Password
                </label>
                <input
                  required
                  id="password"
                  className="mt-2 focus:border-blue-500 block w-full dark:text-gray-400 appearance-none border dark:bg-zinc-900/90 dark:border-gray-200/20 border-gray-300 px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-400 shadow-sm sm:text-sm"
                  type={showVisibility ? "text" : "password"}
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {showVisibility ?
                  <MdVisibility onClick={() => setShowVisibility(!showVisibility)} className="cursor-pointer text-gray-500 absolute right-2 top-11" /> :
                  <MdVisibilityOff onClick={() => setShowVisibility(!showVisibility)} className="cursor-pointer text-gray-500 absolute right-2 top-11" />
                }
              </div>
              <div className="mt-6">
                <button className="flex items-center gap-2 w-full justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                  {loading ? <><Spinner />Processing...</> : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
