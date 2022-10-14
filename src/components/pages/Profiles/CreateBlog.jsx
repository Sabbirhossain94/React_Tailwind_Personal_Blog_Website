import React from 'react'
import { useState, useEffect, useRef } from 'react';
import supabase from '../../../supabaseClient'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import JoditEditor from 'jodit-react';
import Notification from '../../../Sub-components/Notification';

export default function CreateBlog({ session }) {

    const params = useParams();
    let location = useLocation();
    let getString = location.pathname;
    const editor = useRef(null)
    const [title, setTitle] = useState(" ")
    const [content, setContent] = useState("")
    const [message, setMessage] = useState({})

    const date = new Date().toLocaleDateString()
    // adding records to database here

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (params.id) {

            updateBlogContent(e)
        }
        else {

            createBlog(e)
        }
    }




    const createBlog = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase
            .from('blogs')
            .insert(
                { user_id: session.user.id, title: title, content: content, inserted_at: date },
            )
            .single();

        if (error) {

            setMessage({
                type: 'Error',
                msg: error.message,
                remove: () => setMessage({})
            })
        }
        else {
            setMessage({
                type: 'Success',
                msg: 'Successfully Saved The Blog Post',
                remove: () => setMessage({})
            })
        }

    }

    const [singleBlog, setSingleBlog] = useState([])

    const loadBlogContent = async (e) => {

        let { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', params.id)
        if (error) {
            console.log(error)
        }
        else {
            setTitle(data[0].title)
            setContent(data[0].content)
        }
    }

    const updateBlogContent = async (e) => {

        const { data, error } = await supabase
            .from('blogs')
            .update(
                { user_id: session.user.id, title: title, content: content },
            )
            .match({ id: params.id })
        if (error) {

            setMessage({
                type: 'Error',
                msg: error.message,
                remove: () => setMessage({})
            })
        }

        else {
            setMessage({
                type: 'Success',
                msg: 'Successfully Saved The Blog Post',
                remove: () => setMessage({})
            })
        }



    }


    useEffect(() => {

        if (params.id !== undefined) {
            loadBlogContent()

        }

    }, [])


    return (
        <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28"><div className="relative mx-auto max-w-7xl"></div>
            <div >
                <Notification message={message} />
                <div className="">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">Title</label>
                                    <div className="mt-1">
                                        <input onChange={(e) => setTitle(e.target.value)} value={title} id="title" name="title" className="ring-1 mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="comment" className="mt-5 lock text-sm font-medium text-gray-700">Content</label>
                                        {/* <div class="mt-2">
                                            <textarea onChange={(e) => setContent(e.target.value)} value={content} rows="6" name="comment" id="comment" class="ring-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                                        </div> */}
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            onChange={newContent => setContent(newContent)}
                                        />
                                    </div>
                                </div>
                            </div>
                            { getString === "/createblog" ? (<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Post</button>
                            </div>) : (<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update</button>
                            </div>)}
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}
