import { useState } from "react";
import { signIn } from "../../../services/signIn";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    await signIn(e, email, setLoading)
  };

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 dark:bg-zinc-800">
      <div className="mt-4 mx-auto w-3/4 md:w-full max-w-md ">
        <div className="bg-white dark:bg-zinc-900 py-8 px-4 border border-zinc-300 dark:border-zinc-700 sm:px-10">
          <h2 className="text-center text-2xl font-bold tracking-tight dark:text-gray-300 text-slate-900">
            Sign in
          </h2>
          <div className="mt-4 px-2">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium dark:text-gray-300 text-slate-900"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button className="flex w-full justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                  {loading ? "Processing..." : "Get Magic Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
