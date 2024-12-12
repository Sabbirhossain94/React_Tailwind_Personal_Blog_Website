import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
      <div className="flex">
          <div className="flex items-center space-x-4 ">
              <Link to="/" className="flex flex-row">
                  <h1 className="dark:text-gray-200 mt-1 text-xl font-semibold">
                      <span className="text-zinc-600 font-semibold dark:text-gray-400">Sabbir's</span>
                      <span className="text-blue-500 dark:text-teal-500 ml-2">{`{ Blogs }`}</span>
                  </h1>
              </Link>
          </div>
      </div>
  )
}

export default Logo