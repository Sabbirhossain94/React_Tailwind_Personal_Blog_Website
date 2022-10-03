import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'

export default function Pagination({ currentPage, setCurrentPage, totalPage, getblogs }) {

    let location = useLocation();
    let parameter = location.search.substring(0, (location.search.indexOf("=") + 1))

    function previousPage() {
        if (currentPage !== 1) {
            setCurrentPage(e => e - 1)
        }
    }
    function nextPage() {
        if (currentPage !== totalPage) {
            setCurrentPage(e => e + 1)
        }
    }

    useEffect(() => {
        getblogs()
    },[currentPage])

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
                    <Link to={`/${parameter}${currentPage}`} onClick={() => previousPage()} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</Link>
                    <Link to={`/${parameter}${currentPage}`} onClick={() => nextPage()} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</Link>
                </div>
            </nav></div>
    )
}
