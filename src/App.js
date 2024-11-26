import "./index.css";
import supabase from "./services/supabaseClient";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./components/layout/pagination/Pagination";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { fetchBlogs } from "./services/fetchBlogs";
import { CardSkeleton } from "./components/layout/skeleton/Skeleton";
import AboutMe from "./components/layout/static/AboutMe";

function App() {
  const [loading, setLoading] = useState(true);
  const [allBlog, setAllBlog] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(null);
  let firstItemIndex = (currentPage - 1) * itemsPerPage;
  let lastItemIndex = Math.min(firstItemIndex + itemsPerPage, totalLength);
  const blogCoverUrl = process.env.REACT_APP_STORAGE_PUBLIC_URL;

  useEffect(() => {
    fetchBlogs({
      supabase,
      setLoading,
      setRecentBlogs,
      setAllBlog,
      setTotalLength,
      currentPage,
      itemsPerPage,
      setItemsPerPage,
      firstItemIndex,
      lastItemIndex
    })
    // eslint-disable-next-line
  }, [currentPage, itemsPerPage]);

  return (
    <div className="bg-gray-100 dark:bg-zinc-800">
      <div className="flex justify-center max-w-7xl mx-auto py-20">
        <div className="min-h-screen flex flex-col justify-start w-3/4 relative dark:bg-zinc-800 mt-20">
          <div className="flex flex-wrap gap-8">
            {loading ? (
              Array(itemsPerPage)
                .fill(null)
                .map((_, index) => <CardSkeleton key={index} />)
            ) : (
              allBlog.map((blog, key) => (
                <div key={key} className="relative w-[400px] rounded-md scale-100 transition duration-300 hover:scale-105">
                  <Link
                    to={`/blog/` + blog.slug}
                    className="flex flex-col border border-zinc-300 dark:border-gray-100/10"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover"
                        src={blogCoverUrl + blog.thumbnail}
                        alt="error"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between dark:bg-zinc-900/50 bg-white p-6 ">
                      <div className="flex-1">
                        <div className="mt-2 block">
                          <p className="text-md ">
                            <span className="dark:text-teal-600 text-blue-500">
                              {blog.inserted_at}
                            </span>
                          </p>
                          <p className="mt-2 text-xl font-semibold dark:text-gray-200">
                            {blog.title}
                          </p>
                          <div className="text-md mt-2 w-full h-[100px] overflow-hidden">
                            <p
                              className="text-md dark:text-gray-400 text-[#666]"
                            >
                              {blog.introduction}
                            </p>
                          </div>
                          <div className="mt-6 flex items-center">
                            <div>
                              <div className="text-md font-medium dark:text-gray-200 flex flex-row items-center transition ease-in-out duration-300 translate-x-0 hover:translate-x-2">
                                <span>Read more</span>{" "}
                                <AiOutlineDoubleRight className="dark:text-teal-500 text-blue-500 ml-1 " />
                              </div>
                              <div className="flex space-x-1 text-sm text-gray-500"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalLength={totalLength}
          />
        </div>
        <div className="mt-20 flex flex-col gap-10 w-1/4 ">
          <AboutMe />
          <div className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 p-4 flex flex-col justify-start">
            <p className="text-2xl dark:text-gray-200 font-semibold">Recent Blogs</p>
            <ul className="mt-4 space-y-3">
              {recentBlogs && recentBlogs.map((blog, key) => (
                <li key={key} className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                  <Link to={`/content/` + blog.id}>
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
