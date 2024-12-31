export function CardSkeleton() {
    return (
        <div className="col-span-1 p-4 border border-zinc-300 animate-pulse md:p-6 dark:border-zinc-700">
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-4/5 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-center mt-4">
                <div>
                    <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                </div>
            </div>
        </div>
    )
}

export function SingleBlogSkeleton() {
    return (
        <div className="w-full mt-20 scale-100 min-h-screen border border-zinc-300 animate-pulse dark:border-zinc-700">
            <div className="flex items-center justify-center h-screen mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
            <div className="p-4 flex flex-col gap-4">
                <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
        </div>
    )
}

export function PostsTableSkeleton() {
    return (
        <tr className="odd:bg-white animate-pulse dark:text-gray-400 odd:dark:bg-zinc-800 even:bg-gray-100 even:dark:bg-zinc-900/50 border-b dark:border-zinc-700">
            <td className="px-6 py-4 font-medium whitespace-nowrap ">
                <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-4"></div>
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
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            </td>
        </tr>
    )
}

export function UsersTableSkeleton() {
    return (
        <tr className="odd:bg-white animate-pulse dark:text-gray-400 odd:dark:bg-zinc-800 even:bg-gray-100 even:dark:bg-zinc-900/50 border-b dark:border-zinc-700">
            <td className="px-6 py-4 font-medium whitespace-nowrap ">
                <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-full"></div>
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
                <div className="h-6 animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-36"></div>
            </div>
            <ul className="mt-4 space-y-3">
                <li className="hover:text-blue-500 gap-2 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                    <div className="animate-pulse md:space-y-0 flex items-center gap-2">
                        <div className="flex items-center justify-center h-16 bg-gray-300 w-16 dark:bg-gray-700">
                            <svg className="w-6 h-6 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div >
                            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-52 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                        </div>
                    </div>
                </li>
                <li className="hover:text-blue-500 gap-2 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                    <div className="animate-pulse md:space-y-0 flex items-center gap-2">
                        <div className="flex items-center justify-center h-16 bg-gray-300 w-16 dark:bg-gray-700">
                            <svg className="w-6 h-6 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div >
                            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-52 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                        </div>
                    </div>
                </li>
                <li className="hover:text-blue-500 gap-2 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                    <div className="animate-pulse md:space-y-0 flex items-center gap-2">
                        <div className="flex items-center justify-center h-16 bg-gray-300 w-16 dark:bg-gray-700">
                            <svg className="w-6 h-6 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div >
                            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-52 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                        </div>
                    </div>
                </li>
                <li className="hover:text-blue-500 gap-2 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                    <div className="animate-pulse md:space-y-0 flex items-center gap-2">
                        <div className="flex items-center justify-center h-16 bg-gray-300 w-16 dark:bg-gray-700">
                            <svg className="w-6 h-6 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div >
                            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-52 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export function ImagePlaceholder() {
    return (
        <div className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 w-[300px] h-[200px]">
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
        </div>
    )
}

export function ProfileImagePlaceholder() {
    return (
        <div className="space-y-8 animate-pulse md:space-y-0 md:space-x-8">
            <div className="flex items-center justify-center w-[150px] h-[150px] rounded-full bg-gray-300 dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
        </div>
    )
}

export function NavImagePlaceholder() {
    return (
        <div className="animate-pulse">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700">
                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
        </div>
    )
}

export function CommentSkeleton() {
    return (
        <li className='flex flex-row py-4 border-b border-zinc-300 dark:border-zinc-700 animate-pulse'>
            <div className='w-full flex flex-col sm:flex-row gap-1 xl:gap-4'>
                <svg className="w-16 h-16 text-gray-300 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <div className='flex flex-col w-full'>
                    <div className='inline-flex items-center gap-2 mt-2'>
                        <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
                        <span className='h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-24 mb-4'></span>
                    </div>
                    <div className='inline-flex items-center gap-2'>
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-72 mb-4"></div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-4 mb-4' ></p>
                        <p className='h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-10 mb-4'></p>
                        <p className='h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-10 mb-4'></p>
                    </div>
                </div>
            </div>
            <div>
                <p className='font-semibold dark:text-gray-400 flex gap-2'>
                    <span className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-4 mb-4'>{''}</span>
                    <span className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-4 mb-4'>{''}</span>
                    <span className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-4 mb-4'>{''}</span>
                    <span className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-4 mb-4'>{''}</span>
                    <span className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-4 mb-4'>{''}</span>
                </p>
            </div>
        </li>
    )
}

export function DashboardCardsSkeleton() {
    return (
        <div className='animate-pulse flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-full md:w-1/3 bg-white dark:bg-zinc-900/50 p-4'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col'>
                    <div>
                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-4'></p>
                    </div>
                    <div>
                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-8 mb-4'></p>
                    </div>
                </div>
                <svg className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
            <div>
                <p className='flex gap-3 items-center text-sm'>
                    <span className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-8 mb-4'></span>
                    <span className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-4'></span>
                </p>
            </div>
        </div>
    )
}

export function DashboardRecentUsersSkeletion() {
    return (
        <div className='animate-pulse flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-full lg:w-full xl:w-1/2 bg-white dark:bg-zinc-900/50 p-6'>
            <div className='flex flex-row justify-between items-center py-2'>
                <div>
                    <p className='h-8 bg-gray-300 dark:bg-gray-700 w-52 rounded-full'></p>
                </div>
                <div>
                    <button className="h-8 bg-gray-300 dark:bg-gray-700 w-24 rounded-full">
                    </button>
                </div>
            </div>
            <div>
                <ul className="space-y-6">
                    <li className='flex justify-between border dark:text-gray-400 py-3 px-4 font-medium bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-20 rounded-full"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-20 rounded-full"></div>
                    </li>
                    <li className="pb-4">
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <svg className="w-12 h-12 text-gray-300 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                    </svg>
                                    <div>
                                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-44'></p>
                                        <p className='h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-64 mt-4'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center text-sm text-gray-700 dark:text-gray-500'>
                                <p className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32"></p>
                            </div>
                        </div>
                    </li>
                    <li className="pb-4">
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <svg className="w-12 h-12 text-gray-300 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                    </svg>
                                    <div>
                                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-44'></p>
                                        <p className='h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-64 mt-4'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center text-sm text-gray-700 dark:text-gray-500'>
                                <p className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32"></p>
                            </div>
                        </div>
                    </li>
                    <li className="pb-4">
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <svg className="w-12 h-12 text-gray-300 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                    </svg>
                                    <div>
                                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-44'></p>
                                        <p className='h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-64 mt-4'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center text-sm text-gray-700 dark:text-gray-500'>
                                <p className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32"></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export function DashboardRecentCommentsSkeletion() {
    return (
        <div className='animate-pulse flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-full lg:w-full xl:w-1/2 bg-white dark:bg-zinc-900/50 p-6'>
            <div className='flex flex-row justify-between items-center py-2'>
                <div>
                    <p className='h-6 bg-gray-300 dark:bg-gray-700 w-52 rounded-full'></p>
                </div>
                <div>
                    <button className="h-6 bg-gray-300 dark:bg-gray-700 w-24 rounded-full">
                    </button>
                </div>
            </div>
            <div>
                <ul className="space-y-6">
                    <li className='flex justify-between border dark:text-gray-400 py-3 px-4 font-medium bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-44 rounded-full"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-24 rounded-full"></div>
                    </li>
                    <li className="pb-4">
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <div>
                                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-44'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center text-sm text-gray-700 dark:text-gray-500'>
                                <p className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></p>
                            </div>
                        </div>
                    </li>
                    <li className="pb-4">
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <div>
                                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-44'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center text-sm text-gray-700 dark:text-gray-500'>
                                <p className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></p>
                            </div>
                        </div>
                    </li>
                    <li className="pb-4">
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <div>
                                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-44'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center text-sm text-gray-700 dark:text-gray-500'>
                                <p className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></p>
                            </div>
                        </div>
                    </li>
                    <li className="pb-4">
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <div>
                                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-44'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center text-sm text-gray-700 dark:text-gray-500'>
                                <p className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></p>
                            </div>
                        </div>
                    </li>
                    <li className="pb-4">
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <div>
                                        <p className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-44'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center text-sm text-gray-700 dark:text-gray-500'>
                                <p className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
