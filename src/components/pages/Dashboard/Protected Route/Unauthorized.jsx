import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div className="dark:bg-zinc-800 bg-gray-100">
            <div className='h-screen flex flex-col gap-4 items-center justify-center'>
                <FaLock className='text-6xl text-blue-500 dark:text-teal-500' />
                <p className='text-2xl dark:text-gray-400 font-semibold'>Access to this page is restricted!</p>
                <p className='text-lg dark:text-gray-500'>This route is for admin only</p>
                <Link to="/dashboard">
                    <button className="mt-2 flex items-center gap-2 w-[250px] justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500"> Go back to Dashboard</button>
                </Link>
            </div>
        </div>
    )
}

export default Unauthorized