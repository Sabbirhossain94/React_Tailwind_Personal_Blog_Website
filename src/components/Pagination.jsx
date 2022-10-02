import React from 'react'

export default function Pagination() {
    return (
        <div> <nav className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing

                    <span className="font-medium">  </span>
                    results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
        </nav></div>
    )
}
