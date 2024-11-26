import React from 'react'
import { Outlet, useLocation } from "react-router-dom";
import { dashboardItems } from '../../../helpers/dashboard';
import { Link } from 'react-router-dom';

function Dashboard() {
    const location = useLocation();
    let currentPath = location.pathname.split("/")
    return (
        <div className='bg-gray-100 dark:bg-zinc-800 min-h-screen'>
            {/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button> */}
            <div className='flex pt-[70px]'>
                <aside className=" bg-white dark:bg-zinc-900 border-r border-zinc-300 dark:border-zinc-700 left-0 z-40 w-72 min-h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto ">
                        <ul className="space-y-2 font-medium flex flex-col gap-1">
                            {dashboardItems.map((nav, key) => (
                                <Link
                                    key={key}
                                    to={nav.path}
                                >
                                    <li key={key} className='flex items-center justify-between '>
                                        <p className={`${currentPath[2] === nav.path ? "bg-gray-100 text-blue-500 dark:text-teal-500 dark:bg-zinc-700/50" : ""} w-full space-y-2 items-center flex text-[16px] gap-2 p-2 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 group`}>
                                            <span className='text-2xl'>{nav.icon}</span>
                                            {nav.label}
                                        </p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </aside>
                <div className="min-h-screen w-full px-10 py-10">
                    <div className="border-gray-200 rounded-lg dark:border-gray-700">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard