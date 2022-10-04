import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Pagination({ currentPage, getblogs, blogLength, perPage,blogsPerPage }) {

    // let location = useLocation();
    // let parameter = location.search.substring(0, (location.search.indexOf("=") + 1))
    // console.log(location.search)
    const [newPage, setNewPage] = useState(currentPage)
    console.log(newPage)
    const totalPage = Math.ceil(blogLength / perPage)
    // console.log(currentPage)

    function previousPage() {
        if (newPage !== 1) {
            setNewPage(prevState => prevState - 1)
            console.log(newPage)
        }

    }
    function nextPage() {
        if (newPage !== totalPage) {
            setNewPage(prevState => prevState + 1)
            console.log(newPage)
        }


    }

    useEffect(() => {
        getblogs()
    }, [newPage])

    return (
        <div>
            <nav className=" flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing {blogsPerPage.length}

                        <span className="font-medium">  out of  {blogLength} </span>
                        results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <button className={`${currentPage === 1 ? 'bg-gray-500' : " bg-blue-500"}relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500`}><Link to={`/?page=${newPage}`} onClick={() => previousPage()} >Previous</Link></button>
                    <button className={`${currentPage === totalPage ? "bg-gray-500" : " bg-blue-500"}relative ml-3 inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500`}><Link to={`/?page=${newPage}`} onClick={() => nextPage()} >Next</Link></button>
                </div>
            </nav></div>
    )
}
