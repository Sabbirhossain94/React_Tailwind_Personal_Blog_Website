import React from 'react'
import { TableSkeleton } from '../../../layout/skeleton/Skeleton'
import moment from 'moment'

function TableData({ loading, users }) {
    return (
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-200">
            <thead className="border-b border-zinc-300 dark:border-zinc-700 uppercase text-white dark:text-gray-800 bg-blue-500 dark:bg-teal-500 dark:bg-zinc-900/50">
                <tr>
                    <th scope="col" className="px-6 py-4 text-[12px]">
                        {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Username'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px]">
                        {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Avatar'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px] whitespace-nowrap">
                        {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Email'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px] whitespace-nowrap">
                        {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Created At'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px] whitespace-nowrap">
                        {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Updated At'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-[12px] whitespace-nowrap">
                        {loading ? <div className="h-4 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div> : 'Role'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {loading ? Array(5)
                    .fill(null)
                    .map((_, index) => <TableSkeleton key={index} />)
                    :
                    users.map((user, key) => (
                        <tr key={key} className="bg-white dark:text-gray-400 dark:bg-zinc-900/50 border-b dark:border-zinc-700">
                            <td className="px-6 py-4 font-medium whitespace-nowrap ">
                                {user.username}
                            </td>
                            <td className="px-6 py-4">
                                <img src={user.avatar_url} className='h-12 w-12 rounded-full border border-blue-500 dark:border-teal-500' />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {moment(user.created_at).format("MMMM D, YYYY")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {moment(user.updated_at).format("MMMM D, YYYY")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.role === "admin" ? <span className={`px-2 py-1 bg-green-100 text-green-500 dark:bg-teal-400/20 dark:text-teal-500`}>{user.role}</span> :
                                    <span className={`px-2 py-1 bg-blue-100 text-blue-500 dark:bg-blue-400/20 dark:text-blue-500`}>{user.role}</span>
                                }
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default TableData