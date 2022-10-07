import React, { useState } from 'react'

export default function Modal(props) {
    
    const [showModal, setShowModal] = useState(true)
    return (
        <div>
        {showModal ? (
            
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs sm:p-6">
                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                <button onClick={()=>setShowModal(false)} type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                
                                <div className="mt-3 text-center sm:mt-0  sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">{props.header}</h3>
                                    <div className="mt-2">
                                    {props.content}
                                    </div>
                                </div>
                            </div>
                         
                        </div>
                    </div>
                </div>
            </div>

       
        ) : '' }
         </div>
       
    )
}
