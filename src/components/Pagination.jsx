
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'

export default function Pagination({ currentPage, getblogs, blogLength, perPage, blogsPerPage }) {


    //const [newPage, setNewPage] = useState(currentPage)
    const totalPage = Math.ceil(blogLength / perPage)
    const [newPage, setNewPage] = useState(currentPage)


    function previousPage() {
        currentPage--
        if (newPage !== 1) {
            setNewPage(currentPage)
        }
    }

    function nextPage() {
        currentPage++
        if (newPage !== totalPage) {
            setNewPage(currentPage)
        }
    }

    useEffect(() => {
        getblogs()
    }, [currentPage])

    useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div>
            <nav className="mt-[50px] relative flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium text-blue-600">&nbsp;{blogsPerPage.length}</span>
                        <span className="">&nbsp;out of&nbsp;<span className="font-medium text-blue-600">{blogLength} </span></span>
                        results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <Link to={`/?page=${newPage}`} onClick={() => { previousPage(); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} className={`relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium  hover:bg-blue-500${currentPage === 1 ? 'bg-darkgray cursor-not-allowed' : " bg-white"}`} >Previous</Link>
                    <Link to={`/?page=${newPage}`} onClick={() => { nextPage(); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium hover:bg-blue-500${currentPage === totalPage ? "bg-gray-50 cursor-not-allowed" : " bg-white"}`} >Next</Link>
                </div>
            </nav>
        </div>
    )
}
