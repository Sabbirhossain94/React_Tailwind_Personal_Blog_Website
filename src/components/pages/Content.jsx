import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';
import { Link } from 'react-router-dom';

export default function Content() {
    const params = useParams();
    const [singleBlog, setSingleBlog] = useState([])
    const showBlog = async (e) => {
        let { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', params.id)
        if (error) {
            console.log(error)
        }
        else {
            setSingleBlog(data)
            console.log(data)
        }
    }
    const deleteBlog = async (id) => {

        const { data, error } = await supabase
            .from('blogs')
            .delete()
            .match({ id: id })

    }
    useEffect(() => {
        showBlog()
    }, [])
    return (
        <div>
            {singleBlog.map((item, key) => (
                <li key={item.id} className="list-none">
                    <div key={item.id} className="overflow-hidden bg-white">
                        <div className="relative mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                            <div className="absolute top-0 bottom-0 left-3/4 hidden w-screen bg-gray-50 lg:block">
                            </div>
                            <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
                                <div className='flex mr-4'>
                                    <h3 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">{item.title}</h3>
                                    <div className='relative cursor-pointer ml-2 top-[1.2rem]'>
                                        <Link to={`/blog/` + item.id + `/update`}><svg className="fill-sky-200 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg></Link>
                                    </div>
                                    <div onClick={() => deleteBlog(item.id)} className='cursor-pointer relative ml-2 top-[1.2rem]'>
                                        <svg className="w-6 h-6 fill-rose-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                                        </svg>

                                    </div>

                                </div>
                            </div>
                            <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                                <div className="relative lg:col-start-2 lg:row-start-1">
                                    <svg className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
                                        <defs>
                                            <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                                            </pattern>
                                        </defs>
                                        <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
                                    </svg>

                                </div>
                                <div className="mt-8 lg:mt-0">

                                    <div className="prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>


            )

            )}
        </div>
    )
}
