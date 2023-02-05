import "./index.css";
import supabase from "./supabaseClient";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Pagination from "../src/components/Pagination";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import moment from "moment/moment";

function App({ session }) {
  const [allBlog, setAllBlog] = useState([]);
  const [profile, setProfile] = useState([]);
  const [blogLength, setblogLength] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const boolean = useRef(true);
  let location = useLocation();
  const blogCoverUrl = process.env.REACT_APP_STORAGE_PUBLIC_URL;
  const perPage = 3;
  let currentPage;

  if (location.search) {
    currentPage = parseInt(
      location.search.substring(location.search.indexOf("=") + 1)
    );
  } else {
    currentPage = 1;
  }

  const totalBlogs = async (e) => {
    let { data, error } = await supabase.from("blogs").select(`*,profiles(*)`);
    if (error) {
      console.log(error);
    } else {
      setblogLength(data.length);
      setAllBlog(data);
      const [file] = data;
      getAvatarFromStorage(file.profiles.avatar_url);
    }
  };

  const getAvatarFromStorage = async (file) => {
    let { data, error } = await supabase.storage
      .from("avatars")
      .download(`Profile Photo/${file}`);
    if (data) {
      const url = URL.createObjectURL(data);
      setAvatar(url);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    totalBlogs();
  }, []);

  useEffect(() => {
    totalBlogs();
  }, []);

  return (
    <div>
      <TransitionGroup>
        {allBlog.map((item, key) => (
          <CSSTransition
            key={key}
            in={boolean.current}
            classNames="slide"
            timeout={300}
          >
            <li key={item.id} className="list-none ">
              <div className=" relative mx-auto mt-12 grid max-w-lg gap-5 flex-shrink w-1/2 scale-100 transition duration-300 hover:scale-105">
                <Link
                  to={`/content/` + item.id}
                  className="flex flex-col rounded-xl shadow-lg"
                >
                  <div className="border border-slate-300 flex-shrink-0">
                    <img
                      className="h-48 w-full object-contain rounded-md"
                      src={blogCoverUrl + item.thumbnail}
                      alt="error"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <div className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {item.title}
                        </p>
                        {/* <div className="mt-3 text-base text-gray-500">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.content.slice(0, 20),
                            }}
                          />
                        </div> */}
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <div>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={avatar}
                                alt="error"
                              />
                            </div>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">
                              <p href="#" className="text-md">
                                {item.profiles.username}
                              </p>
                              <p href="#" className="text-xs text-blue-600">
                                {item.inserted_at}
                              </p>
                            </h3>
                            <div className="flex space-x-1 text-sm text-gray-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {/* <Pagination
        currentPage={currentPage}
        perPage={perPage}
        getblogs={getAllBlogs}
        blogLength={blogLength}
        blogsPerPage={allBlog}
      /> */}
    </div>
  );
}

export default App;
