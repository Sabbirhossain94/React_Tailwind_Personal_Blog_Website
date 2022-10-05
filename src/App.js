import "./index.css"
import supabase from "./supabaseClient";
import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Pagination from "../src/components/Pagination"
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App({ session }) {

  const [allBlog, setAllBlog] = useState([]);
  const [profile, setProfile] = useState([]);
  const boolean = useRef(true)
  let location = useLocation();

  const perPage = 3;
  let currentPage;
  if (location.search) {
    currentPage = parseInt(location.search.substring(location.search.indexOf('=') + 1));

  }
  else {
    currentPage = 1
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
    getAllBlogs()
  }, [currentPage]);

  useEffect(() => {
    getProfile()
  }, [session])


  const [blogLength, setblogLength] = useState(null)

  const totalBlogs = async (e) => {

    let { data, error } = await supabase
      .from('blogs')
      .select('*')
    if (error) {
      console.log(error)
    }
    else {
      setblogLength(data.length)
    }

  }

  useEffect(() => {
    totalBlogs()
  }, [currentPage])




  return (
    <div>

      <div>
        {allBlog.map((item, key) => (
          <TransitionGroup>
            <CSSTransition key={item.id}
              in={boolean.current}
              classNames="slide-horizontal"
              timeout={300}
            >
              <div className="">
                <div key={item.id} className=" mx-auto mt-12 grid max-w-lg gap-5 sm:flex-shrink sm:w-1/2">
                  <div className="flex flex-col rounded-lg shadow-lg">
                    <div className="flex-shrink-0">
                      <img className="h-48 w-full object-cover" src="https://i.imgur.com/iW9aFdD.jpg" alt="" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-indigo-600">
                          <p >{item.category}</p>
                        </h3>
                        <div className="mt-2 block">
                          <p className="text-xl font-semibold text-gray-900">{item.title}</p>
                          <div className="mt-3 flex flex-row text-base text-gray-500 "><div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: item.content.substring(0, 50) }} />
                            <Link to={`/content/` + item.id} className="text-blue-500 ml-[10px]">Learn More </Link>
                          </div>
                        </div>
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
          </TransitionGroup >
        ))}

        {/* blogs end */}

        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          getblogs={getAllBlogs}
          blogLength={blogLength}
          blogsPerPage={allBlog}
        />
      </div>
    </div>
  );
}

export default App;
