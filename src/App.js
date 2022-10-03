import "./index.css"
import supabase from "./supabaseClient";
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Pagination from "../src/components/Pagination"
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App({ session }) {

  const [allBlog, setAllBlog] = useState([]);
  const [profile, setProfile] = useState([]);

  let location = useLocation();
  // console.log(location.search)

  React.useEffect(() => {
    getAllBlogs()
  }, [allBlog.length]);

  const perPage = 3;
  let currentPage;
  if (location.search) {
    currentPage = parseInt(location.search.substring(location.search.indexOf('=') + 1));
    console.log(currentPage)
  }
  else {
    currentPage = 1;
  }


  const getAllBlogs = async (e) => {

    let { data, error } = await supabase
      .from('blogs')
      .select('*')
      .range((currentPage - 1) * perPage, ((perPage * currentPage) - 1))

    if (error) {
      console.log(error)
    } else {
      setAllBlog(data);
    }
  }

  const getProfile = async (e) => {
    let { data, error } = await supabase
      .from('profiles')
      .select('*')
    if (error) {
      console.log(error)
    } else {
      setProfile(data)
    }

  }
  const storageUrl = 'https://uytustuoqlniazcbopzo.supabase.co/storage/v1/object/avatars/'

  useEffect(() => {
    getProfile()
  }, [session])

  return (
    <div>
      <div className="relative bg-gray-50 mx-auto px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">

        </div>
        <div className="relative mx-auto max-w-7xl lg:mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.</p>
          </div>
          <TransitionGroup>
            {allBlog.map((item, key) => (
              <CSSTransition key={item.id}
                in="true"
                classNames="slide-horizontal"
                timeout={300}
              >
                <div className="">
                  <div key={item.id} className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                      <div className="flex-shrink-0">
                        <img className="h-48 w-full object-cover" src="https://i.imgur.com/iW9aFdD.jpg" alt="" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between bg-white p-6">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-indigo-600">
                            <a href="#" className="hover:underline">{item.category}</a>
                          </p>
                          <Link to={`/content/` + item.id} className="mt-2 block">
                            <p className="text-xl font-semibold text-gray-900">{item.title}</p>
                            <div className="mt-3 text-base text-gray-500">  <div dangerouslySetInnerHTML={{ __html: item.content }} /></div>
                          </Link>
                        </div>

                        {profile.map((item, key) => (

                          <div key={item.id} className="mt-6 flex items-center">
                            <div className="flex-shrink-0">
                              <a href="#">
                                <span className="sr-only">{item.username}</span>
                                <img className="h-10 w-10 rounded-full" src={storageUrl + item.avatar_url} alt="" />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                <a href="#" className="hover:underline">{item.username}</a>
                              </p>
                              <div className="flex space-x-1 text-sm text-gray-500">
                                <time dateTime="2020-03-16">{item.updated_at}</time>
                                <span aria-hidden="true">&middot;</span>
                                <span>6 min read</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup >
          {/* blogs end */}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        getblogs={getAllBlogs}
      />
    </div>
  );
}

export default App;
