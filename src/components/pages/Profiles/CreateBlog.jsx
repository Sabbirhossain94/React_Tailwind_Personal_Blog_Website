import React from 'react'
import { useState, useEffect } from 'react';
import supabase from '../../../supabaseClient'

export default function CreateBlog({session}) {
    // const [session, setSession] = useState(null);
    const [title, setTitle] = useState(" ")
    const [content, setContent] = useState(" ")

   
    // adding records to database here
    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase
            .from('blogs')
            .insert(
                { user_id: session.user.id, title: title, content: content },
            )
            .single();
        if (error) {
            console.log(error)
        }
        else {
            console.log(data)
        }

    }
    

    return (
        <div class="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28"><div class="relative mx-auto max-w-7xl"></div>
            <div >

                <div class="">
                    <form onSubmit={handleSubmit}>
                        <div class="shadow sm:overflow-hidden sm:rounded-md">
                            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">Title</label>
                                    <div class="mt-1">
                                        <input onChange={(e) => setTitle(e.target.value)} value={title} id="title" name="title" class="ring-1 mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                    <div class="mt-5">
                                        <label for="comment" class="mt-5 lock text-sm font-medium text-gray-700">Content</label>
                                        <div class="mt-2">
                                            <textarea onChange={(e) => setContent(e.target.value)} value={content} rows="6" name="comment" id="comment" class="ring-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Post</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}
