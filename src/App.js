import "./index.css"
import supabase from "./supabaseClient";
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

function App() {

  const [allBlog, setAllBlog] = useState([]);

  const getAllBlogs = async (e) => {

    let { data, error } = await supabase
      .from('blogs')
      .select('*')
      .range(0, 9)
    if (error) {
      console.log(error)
    } else {
      setAllBlog(data);
    }
  }

  useEffect(() => {
    getAllBlogs()

  }, [])

  return (
    <div>
      <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3"></div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.</p>
          </div>

          {allBlog.map((item) => (
             
              <div key={item.id} className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src="https://i.imgur.com/iW9aFdD.jpg" alt="" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600">
                        <a href="#" className="hover:underline">Article</a>
                      </p>
                      <Link to={`/content/`+ item.id} className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">{item.title}</p>
                        <div className="mt-3 text-base text-gray-500">  <div dangerouslySetInnerHTML={{ __html: item.content }} /></div>
                      </Link>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <a href="#">
                          <span className="sr-only">Roel Aufderehar</span>
                          <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          <a href="#" className="hover:underline">Roel Aufderehar</a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime="2020-03-16">Mar 16, 2020</time>
                          <span aria-hidden="true">&middot;</span>
                          <span>6 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
          )
           
          )}
          {/* blogs end */}
        </div>
      </div>
    </div>
  );
}

export default App;
