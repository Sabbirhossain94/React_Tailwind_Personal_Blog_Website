import React from 'react'
import "../../src/animation.css"

export default function NotificationSignIn({ message }) {

    return (
        <div>
            <div
                
                className="mt-[400px] pointer-events-none  mx-auto inset-0 flex justify-end items-center px-4 py-6 sm:p-6"
            >
                {message.hasOwnProperty('type') && message.hasOwnProperty('msg') && message.hasOwnProperty('remove') ? (<div className="flex w-full mx-auto flex-col items-center space-y-4 ">

                    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    {(message.type === "Error") ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" color="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                    </svg>) :
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" color="green" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                    }

                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900">{(message.type === "Error") ? "Error" : "Success"}</p>
                                    <p className="mt-1 text-sm text-gray-500">{message.msg}</p>
                                </div>
                                <div className="ml-4 flex flex-shrink-0">
                                    <button
                                        type="button"
                                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => message.remove()}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>) : ""}
            </div>
        </div>
    )
}
