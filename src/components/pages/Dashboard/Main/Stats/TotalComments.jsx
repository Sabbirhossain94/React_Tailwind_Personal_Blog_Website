import { BiCommentDetail } from "react-icons/bi";
import { FaLongArrowAltUp } from "react-icons/fa";

function TotalComments({comments}) {
  return (
    <div className='flex flex-col gap-6 border border-zinc-300 dark:border-zinc-700 w-full md:w-1/3 bg-white dark:bg-zinc-900/50 p-4'>
                <div className='flex flex-row justify-between items-center'>
                  <div className='flex flex-col'>
                    <div>
                      <p className='xl:text-lg uppercase dark:text-gray-400 font-medium'>Total Comments</p>
                    </div>
                    <div>
                      <p className='text-2xl font-bold dark:text-gray-400'>{comments?.all?.length}</p>
                    </div>
                  </div>
                  <div className='mb-3'>
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
  )
}

export default TotalComments