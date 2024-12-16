import React from 'react'
import { FaLock } from "react-icons/fa";

function Unauthorized() {
    return (
        <div>
            <div className='h-screen flex flex-col gap-4 items-center justify-center'>
                <FaLock className='text-6xl text-blue-500 dark:text-teal-500' />
                <p className='text-2xl dark:text-gray-400 font-semibold'>Access to this page is restricted!</p>
                <p className='text-lg dark:text-gray-400'>This route is for admin only</p>
            </div>
        </div>
    )
}

export default Unauthorized