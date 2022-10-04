import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'

export default function Pagination({ currentPage, getblogs, blogLength, perPage }) {

    // let location = useLocation();
    // let parameter = location.search.substring(0, (location.search.indexOf("=") + 1))
    // console.log(location.search)

    const totalPage = Math.ceil(blogLength / perPage)
    console.log(currentPage)
    function previousPage() {
        if (currentPage !== 1) {
            currentPage--;
            console.log(currentPage)

        }
        return currentPage

    }
    function nextPage() {
        if (currentPage !== totalPage) {
            currentPage++;
            console.log(currentPage)

        }
        return currentPage

    }

    useEffect(() => {
        getblogs()
    }, [currentPage])

    return (
        <div>
            <nav className=" flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing

                        <span className="font-medium">  </span>
                        results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <Link onClick={()=>previousPage()} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</Link>
                    <Link onClick={()=>nextPage()} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</Link>
                </div>
            </nav></div>
    )
}
