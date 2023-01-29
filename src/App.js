import "./index.css";
import supabase from "./supabaseClient";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Pagination from "../src/components/Pagination";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AuthAlert from "./Sub-components/AuthAlert";

function App({ session }) {
  const [allBlog, setAllBlog] = useState([]);
  const [profile, setProfile] = useState([]);
  const [blogLength, setblogLength] = useState(null);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const boolean = useRef(true);
  let location = useLocation();

  const perPage = 3;
  let currentPage;
  if (location.search) {
    currentPage = parseInt(
      location.search.substring(location.search.indexOf("=") + 1)
    );
  } else {
    currentPage = 1;
  }
  const getAllBlogs = async (e) => {
    let { data, error } = await supabase
      .from("blogs")
      .select("*")
      .range((currentPage - 1) * perPage, perPage * currentPage - 1);
    if (error) {
      console.log(error);
    } else {
      setAllBlog(data);
    }
  };
  const getProfile = async (e) => {
    let { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.log(error);
    } else {
      setProfile(data);
    }
  };

  const totalBlogs = async (e) => {
    let { data, error } = await supabase.from("blogs").select("*");
    if (error) {
      console.log(error);
    } else {
      setblogLength(data.length);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, [allBlog]);

  useEffect(() => {
    getProfile();
  }, [profile]);

  useEffect(() => {
    totalBlogs();
  }, [blogLength]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT") {
        setMessage("Successfully logged out!");
        setAlert(!alert);
      }
    });
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        setMessage("Successfully logged in!");
        setAlert(!alert);
      }
    });
  }, []);
  return (
    <div>
     <AuthAlert alert={alert} message={message} setAlert={setAlert}/>
      <TransitionGroup>
        {allBlog.map((item, key) => (
          <CSSTransition
            key={key}
            in={boolean.current}
            classNames="slide"
            timeout={300}
          >
            <li key={item.id} className="list-none">
              <div className="relative mx-auto mt-12 grid max-w-lg gap-5 flex-shrink w-1/2">
                <Link
                  to={`/content/` + item.id}
                  className="flex flex-col rounded-lg shadow-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover"
                      src="https://i.imgur.com/ihfKcKx.jpg"
                      alt="error"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-indigo-600">
                        <p>{item.inserted_at}</p>
                      </div>
                      <div className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {item.title}
                        </p>
                        <div className="mt-3 text-base text-gray-500">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.content.slice(0, 20),
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {profile.map((item) => (
                      <div key={item.id} className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <div>
                            <img
                              className="h-10 w-10 rounded-full"
                              src={item.avatar_url}
                              alt="error"
                            />
                          </div>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900">
                            <p href="#">{item.username}</p>
                          </h3>
                          <div className="flex space-x-1 text-sm text-gray-500"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        getblogs={getAllBlogs}
        blogLength={blogLength}
        blogsPerPage={allBlog}
      />
    </div>
  );
}

export default App;
