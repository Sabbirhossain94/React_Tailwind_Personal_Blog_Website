import React from 'react'

function Rating({ratingInfo}) {
    return (
        <div className='relative flex flex-1 justify-center items-center pt-8 overflow-hidden'>
            <div className='border border-dashed border-zinc-300 dark:border-zinc-700 min-w-[100px] sm:min-w-[150px] md:min-w-[250px] lg:w-full'></div>
            <div className='flex flex-col justify-center items-center'>
                <div className='relative flex space-y-1 flex-col justify-center z-20 p-10'>
                    <span className='justify-center text-center dark:text-gray-400 text-2xl font-semibold'>{ratingInfo?.roundedRating ? ratingInfo?.roundedRating.toFixed(1) : "Not Rated"}</span>
                    <p className='flex justify-center items-center gap-2 text-gray-600'>
                        {ratingInfo?.fullStars && ratingInfo?.fullStars.map((star, index) => (
                            <span key={index} className='text-yellow-400 dark:text-teal-500 text-lg'>{star}</span>
                        ))}
                        {ratingInfo?.emptyStars && ratingInfo?.emptyStars.map((star, index) => (
                            <span key={index} className='text-yellow-400 dark:text-teal-500 text-lg'>{star}</span>
                        ))}
                    </p>
                    <p className='text-gray-500 text-center whitespace-nowrap font-semibold text-lg'>{ratingInfo?.totalRating} {ratingInfo?.totalRating > 1 ? "Ratings" : "Rating"}</p>
                </div>
            </div>
            <div className='border border-dashed border-zinc-300 dark:border-zinc-700 min-w-[100px] sm:min-w-[150px] md:min-w-[250px] lg:w-full'></div>
        </div>
    )
}

export default Rating