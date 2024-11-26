import { useState } from "react";
import supabase from "../../../services/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-zinc-900/90">
        <div className="mt-4 mx-auto w-3/4 md:w-full max-w-md rounded-lg ">
          <div className="bg-white dark:bg-zinc-900 py-8 px-4 shadow-lg border border-gray-200/20 rounded-lg sm:px-10">
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
                      id="email"
                      className="inputField block w-full dark:text-gray-400 appearance-none rounded-md border dark:bg-zinc-900/90 dark:border-gray-200/20 border-gray-300 px-3 py-2 placeholder:text-gray-100 dark:placeholder:text-gray-400 shadow-sm sm:text-sm"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 dark:bg-zinc-200/20 dark:hover:bg-zinc-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    {loading ? "Processing..." : "Get Magic Link"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
