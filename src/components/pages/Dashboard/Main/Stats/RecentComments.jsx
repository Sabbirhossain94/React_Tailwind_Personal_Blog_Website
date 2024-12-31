import React from 'react'

function RecentComments({comments}) {
  return (
      <div className='flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-full lg:w-full xl:w-1/2 bg-white dark:bg-zinc-900/50 p-6'>
          <div className='flex flex-row justify-between items-center py-2'>
              <div>
                  <p className='xl:text-lg uppercase dark:text-gray-400 font-medium'>Recent Comments</p>
              </div>
              <div>
                  <button className="inline-flex gap-2 items-center w-[100px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                      Show All
                  </button>
              </div>
          </div>
          <div>
              <ul className='space-y-4'>
                  <li className='flex justify-between border dark:text-gray-400 py-2 px-2 font-medium bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'>
                      <div><p>Content</p></div>
                      <div><p>Likes</p></div>
                  </li>
                  {comments?.all?.slice(0, 5).map((comment, index) => (
                      <li key={index} className={`flex justify-between dark:text-gray-400 py-2 px-2 font-medium border-zinc-300 dark:border-zinc-700 ${index === comments.all.slice(0, 5).length - 1 ? 'border-none' : 'border-b'
                          }`}>
                          <div>
                              <p className='text-gray-600 dark:text-gray-500'>{comment.content}</p>
                          </div>
                          <div>
                              <p className='text-gray-600 dark:text-gray-500'>{comment.likes.length === 0 ? "0" : comment.likes.length}</p>
                          </div>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  )
}

export default RecentComments