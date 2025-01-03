import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FaInbox } from "react-icons/fa";

function RecentUsers({ users }) {
    return (
        <div className='flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-full lg:w-full xl:w-1/2 bg-white dark:bg-zinc-900/50 p-6'>
            <div className='flex flex-row justify-between items-center py-2'>
                <div>
                    <p className='xl:text-lg uppercase dark:text-gray-400 font-medium'>Recent Users</p>
                </div>
                <div>
                    <Link to="/dashboard/users">
                        <button className="inline-flex gap-2 items-center w-[100px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                            Show All
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <ul className='space-y-6'>
                    <li className='flex justify-between border dark:text-gray-400 py-2 px-4 font-medium bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'>
                        <div className='hidden sm:block'><p>User</p></div>
                        <div className='block sm:hidden'><p>User Details</p></div>
                        <div className='hidden sm:block'><p>Joined</p></div>
                    </li>
                    {users?.all?.length > 0 ? users?.all?.slice(0, 5).map((user, index) => (
                        <li key={index} className={`${index === users?.all?.slice(0, 5).length - 1 ? 'border-none' : 'border-b'} border-zinc-300 dark:border-zinc-700 pb-4`}>
                            <div className='flex flex-col sm:flex-row sm:justify-between'>
                                <div className='flex gap-4'>
                                    <img src={user.avatar_url} alt="avatar" className='h-12 w-12 object-cover border border-blue-500 dark:border-teal-500 rounded-full' />
                                    <div>
                                        <p className='font-semibold dark:text-gray-400'>{user.username}</p>
                                        <p className='text-sm text-gray-700 dark:text-gray-500 break-words'>{user.email}</p>
                                    </div>
                                </div>
                                <div className='hidden sm:flex items-center text-sm text-gray-700 dark:text-gray-500'>
                                    <p>{moment(user.created_at).format("MMM D, YYYY")}</p>
                                </div>
                                <div className='flex ml-16 sm:hidden items-center text-sm text-gray-700 dark:text-gray-500'>
                                    <p className='font-bold'>Joined:</p>
                                    <p className='ml-2'>{moment(user.created_at).format("MMM D, YYYY")}</p>
                                </div>
                            </div>
                        </li>
                    )) :
                        <div>
                            <li className='flex justify-center py-10 dark:text-gray-400 px-2 font-medium border-zinc-300 dark:border-zinc-700'>
                                <div className='flex flex-col items-center justify-center'>
                                    <FaInbox className='text-7xl text-blue-500 dark:text-teal-500' />
                                    <p className='dark:text-gray-400 text-xl'>No Data</p>
                                </div>
                            </li>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default RecentUsers