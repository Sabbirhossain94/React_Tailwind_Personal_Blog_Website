import React from 'react'
import { contactItems } from '../../../helpers/contact'

function AboutMe() {
    return (
        <div className="border border-zinc-300 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900/50">
            <div className="pt-6 flex justify-center">
                <img alt="avatar" className="border-2 border-blue-500 dark:border-teal-500 h-44 w-44 rounded-full" src='/me.jpg' />
            </div>
            <div className="pt-6">
                <p className='text-2xl font-bold text-center text-[#666] dark:text-gray-400'>Sabbir Hossain</p>
                <p className="text-sm font-semibold text-center text-blue-500 dark:text-teal-500">Frontend Developer</p>
            </div>
            <div className='flex flex-col justify-center'>
                <div className='flex w-full justify-center py-4'>
                    <a href="mailto:sabbirhossainbd199@gmail.com" className="h-10 w-10/12 flex justify-center border border-zinc-300 bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 py-2 text-sm font-medium text-gray-700 dark:text-gray-400 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700">
                        Contact Me
                    </a>
                </div>
                <div className='flex justify-center'>
                    <span className="flex gap-1">
                        {contactItems.map((item, key) => (
                            <a
                                key={key}
                                href={item.link}
                                target='_blank'
                                rel="noreferrer"
                                className={`${key === 0 && "text-md"} cursor-pointer text-gray-500 text-lg rounded-md p-1`}
                            >
                                {item.icon}
                            </a>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    )
}



export default AboutMe