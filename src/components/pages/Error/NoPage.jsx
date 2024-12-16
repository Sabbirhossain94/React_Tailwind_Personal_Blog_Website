import React from 'react'
import { Link } from 'react-router-dom'
function NoPage() {
    return (
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-100 dark:bg-zinc-800">
            <div className="bg-white dark:bg-zinc-900 p-8 text-center">
                <h1 className="mb-4 text-9xl font-bold dark:text-white">404</h1>
                <p className="text-gray-900 dark:text-gray-400">Oops! The page you are looking for could not be found.</p>
                <div className='flex justify-center'>
                    <Link to="/">
                    <button className="mt-6 flex items-center gap-2 w-[250px] justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500"> Go back to Home </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NoPage