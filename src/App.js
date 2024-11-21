import "./index.css";
import supabase from "./supabaseClient";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "./Sub-components/LoadingScreen";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { SiGmail } from "react-icons/si";

function App() {
  const [loading, setLoading] = useState(true);
  const [allBlog, setAllBlog] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([])
  const [_, setAvatar] = useState(null);
  const [itemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(null);

  const blogCoverUrl = process.env.REACT_APP_STORAGE_PUBLIC_URL;

  const totalBlogs = async () => {
    try {
      setLoading(true);

      let { data: allData, error: recentError } = await supabase
        .from("blogs")
        .select(`*,profiles(*)`);

      if (recentError) throw recentError;

      setRecentBlogs(allData || []);

      const firstItemIndex = (currentPage - 1) * itemsPerPage;
      const lastItemIndex = firstItemIndex + itemsPerPage;

      let { data, count, error, status } = await supabase
        .from("blogs")
        .select(`*,profiles(*)`, { count: "exact" })
        .range(firstItemIndex, lastItemIndex - 1);

      if (error && status !== 406) throw error;

      setAllBlog(data || []);
      setTotalLength(count);

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
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
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div className="bg-gray-100 dark:bg-zinc-800">
      <div className="flex justify-center max-w-7xl mx-auto py-20">
        <div className="min-h-screen flex flex-col justify-between w-3/4 relative dark:bg-zinc-800 mt-20">
          <div className="flex flex-wrap mx-auto gap-8">
            {loading ? (
              <LoadingScreen />
            ) : (
              allBlog.map((blog, key) => (
                <div key={key} className="relative w-[400px] rounded-md scale-100 transition duration-300 hover:scale-105">
                  <Link
                    to={`/content/` + blog.id}
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
          <div className="border border-zinc-300 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900/50">
            <h2 className="text-2xl dark:text-gray-200 font-semibold">About Me</h2>
            <div className="pt-6">
              <img className="rounded-md border dark:border-none" src='/me.jpg' />
            </div>
            <div className="pt-6">
              <p className="text-[#666] dark:text-gray-400">I am a Web Application Developer with professional experience in building responsive, scalable, and efficient web applications. My passion lies in crafting intuitive user interfaces that enhance user experiences while ensuring high performance and maintainability. I am continually learning new technologies and improving my skills in web development, with a focus on delivering high-quality user experiences. I thrive in collaborative environments and am excited about contributing to innovative projects.</p>
            </div>
          </div>
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
            {/* <div className="flex gap-2 pt-4">
              <a href="mailto:sabbirhossainbd199@gmail.com">
                <SiGmail
                  className="text-xl text-slate-800 dark:text-gray-500 transition ease-in-out scale-90 hover:scale-100"
                  title="Gmail"
                />
              </a>
              <a href="https://www.linkedin.com/in/sabbir-hossain-b73726214/">
                <BsLinkedin
                  className="text-xl ml-4 text-slate-800 dark:text-gray-500 transition ease-in-out scale-90 hover:scale-100"
                  title="linkedIn"
                />
              </a>
              <a href="https://github.com/Sabbirhossain97">
                <AiFillGithub
                  className="text-xl ml-4 text-slate-800 dark:text-gray-500 transition ease-in-out scale-90 hover:scale-100"
                  title="Github"
                />
              </a>
              <a href="https://sabbir-hossain-six.vercel.app/">
                <MdWork
                  className="text-xl ml-4 text-slate-800 dark:text-gray-500 transition ease-in-out scale-90 hover:scale-100"
                  title="Portfolio"
                />
              </a>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
