export function CardSkeleton() {
    return (
        <div className="w-[400px] p-4 border border-zinc-300 animate-pulse md:p-6 dark:border-zinc-700">
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-center mt-4">
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
        </div>
    )
}

export function SingleBlogSkeleton() {
    return (
        <div className="w-3/4 mt-20 scale-100 h-screen p-4 border border-zinc-300 animate-pulse md:p-6 dark:border-zinc-700">
            <div className="flex items-center justify-center h-screen mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-center mt-4">
                <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
        </div>
    )
}

export function TableSkeleton() {
    return (
        <tr className="odd:bg-white animate-pulse dark:text-gray-400 odd:dark:bg-zinc-800 even:bg-gray-100 even:dark:bg-zinc-900/50 border-b dark:border-zinc-700">
            <td className="px-6 py-4 font-medium whitespace-nowrap ">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </td>
            <td className="px-6 py-4 space-y-2 w-1/3">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </td>
        </tr>
    )
}

export function AboutMeSkeleton() {
    return (
        <div className="max-w-sm flex flex-col items-center justify-center p-4 border border-zinc-300 animate-pulse md:p-6 dark:border-zinc-700" >
            <div className="flex items-center justify-center h-44 w-44 bg-gray-300 rounded-full dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-6"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mt-4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 w-64 py-4 mt-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-center mt-4">
                <div className="flex gap-4">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700"></div>
                </div>
            </div>
        </div >
    )
}

export function RecentBlogsSkeleton() {
    return (
        <div className="border border-zinc-300 dark:border-zinc-700 p-4 flex flex-col justify-start">
            <div className="text-2xl dark:text-gray-200 font-semibold">
                <div className="h-6 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
            </div>
            <ul className="mt-4 space-y-3">
                <li className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mt-4"></div>
                </li>
                <li className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mt-4"></div>
                </li>
                <li className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mt-4"></div>
                </li>
                <li className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mt-4"></div>
                </li>
            </ul>
        </div>
    )
}
