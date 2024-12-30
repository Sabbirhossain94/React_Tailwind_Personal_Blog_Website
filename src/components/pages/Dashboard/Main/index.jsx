import { useState, useEffect } from 'react'
import { FaUsers } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { MdArticle } from "react-icons/md";
import useAllProfiles from '../../../../hooks/useAllProfiles';
import useFetchBlogs from '../../../../hooks/useFetchBlogs';
import { allComments } from '../../../../services/blogs/comments/allComments';

function DashboardMain() {
  const { users } = useAllProfiles();
  const { blogs } = useFetchBlogs();
  const [comments, setComments] = useState({
    all: [],
    sinceLastMonth: null,
  })

  useEffect(() => {
    const fetchComments = async () => {
      const { allCommentsData, recentData } = await allComments();
      setComments({ ...comments, all: allCommentsData, sinceLastMonth: recentData })
    }
    fetchComments()
  }, [])

  return (
    <div className='flex flex-col max-w-6xl mx-auto gap-6 mt-16 lg:mt-0'>
      <section className='flex gap-6'>
        <div className='flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-1/3 bg-white dark:bg-zinc-900/50 p-4'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-col'>
              <div>
                <p className='text-lg uppercase dark:text-gray-400 font-medium whitespace-nowrap'>Total Users</p>
              </div>
              <div>
                <p className='text-2xl font-bold dark:text-gray-400'>{users?.all?.length}</p>
              </div>
            </div>
            <div>
              <FaUsers className='text-5xl text-blue-500 dark:text-teal-500' />
            </div>
          </div>
          <div>
            <p className='flex gap-3 items-center text-sm'>
              <span className='flex font-medium items-center text-blue-500 dark:text-teal-500'><FaLongArrowAltUp />{users?.sinceLastMonth?.length}</span>
              <span className='dark:text-gray-400 font-medium'>Since Last month</span>
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-1/3 bg-white dark:bg-zinc-900/50 p-4'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-col'>
              <div>
                <p className='text-lg uppercase dark:text-gray-400 font-medium whitespace-nowrap'>Total Comments</p>
              </div>
              <div>
                <p className='text-2xl font-bold dark:text-gray-400'>{comments?.all?.length}</p>
              </div>
            </div>
            <div>
              <BiCommentDetail className='text-5xl text-blue-500 dark:text-teal-500' />
            </div>
          </div>
          <div>
            <p className='flex gap-3 items-center text-sm'>
              <span className='flex font-medium items-center text-blue-500 dark:text-teal-500'><FaLongArrowAltUp />{comments?.sinceLastMonth?.length}</span>
              <span className='dark:text-gray-400 font-medium'>Since Last month</span>
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-1/3 bg-white dark:bg-zinc-900/50 p-4'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-col'>
              <div>
                <p className='text-lg uppercase dark:text-gray-400 font-medium whitespace-nowrap'>Total Posts</p>
              </div>
              <div>
                <p className='text-2xl font-bold dark:text-gray-400'>{blogs?.length}</p>
              </div>
            </div>
            <div>
              <MdArticle className='text-5xl text-blue-500 dark:text-teal-500' />
            </div>
          </div>
          <div>
            <p className='flex gap-3 items-center text-sm'>
              <span className='flex font-medium items-center text-blue-500 dark:text-teal-500'><FaLongArrowAltUp />{blogs?.sinceLastMonth?.length}</span>
              <span className='dark:text-gray-400 font-medium'>Since Last month</span>
            </p>
          </div>
        </div>
      </section>

      {/* users and comments section */}
      <section className='flex gap-6'>
        <div className='flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-1/2 bg-white dark:bg-zinc-900/50 p-6'>
          <div className='flex flex-row justify-between items-center py-2'>
            <div>
              <p className='text-lg uppercase dark:text-gray-400 font-medium'>Recent Users</p>
            </div>
            <div>
              <button className="inline-flex gap-2 items-center w-[100px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                Show All
              </button>
            </div>
          </div>
          <div>
            {/* users list here */}
          </div>
        </div>
        <div className='flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-1/2 bg-white dark:bg-zinc-900/50 p-6'>
          <div className='flex flex-row justify-between items-center py-2'>
            <div>
              <p className='text-lg uppercase dark:text-gray-400 font-medium'>Recent Comments</p>
            </div>
            <div>
              <button className="inline-flex gap-2 items-center w-[100px] justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-4 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500">
                Show All
              </button>
            </div>
          </div>
          <div>
            {/* users list here */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardMain