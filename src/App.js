import "./index.css";
import supabase from "./supabaseClient";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "./Sub-components/LoadingScreen";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import { AiOutlineDoubleRight } from "react-icons/ai";

function App() {
  const [loading, setLoading] = useState(true);
  const [allBlog, setAllBlog] = useState([]);
  const [_, setAvatar] = useState(null);
  const [itemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(null);

  const blogCoverUrl = process.env.REACT_APP_STORAGE_PUBLIC_URL;

  const totalBlogs = async () => {
    try {
      setLoading(true);
      let { data, count, error, status } = await supabase
        .from("blogs")
        .select(`*,profiles(*)`, { count: "exact" })
        .range(firstItemIndex, lastItemIndex - 1);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setAllBlog(data);
        const [file] = data;
        getAvatarFromStorage(file.profiles.avatar_url);
        setTotalLength(count);
      }
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

  const lastItemIndex = currentPage * itemsPerPage; //3
  const firstItemIndex = lastItemIndex - itemsPerPage; //0
  return (
    <div>
      <div className="min-h-screen relative dark:bg-zinc-900 bg-white py-10 ">
        {loading ? (
          <LoadingScreen />
        ) : (
          allBlog.map((item, key) => (
            <li key={key} className="list-none ">
              <div className=" relative mx-auto mt-12 grid max-w-lg gap-5 flex-shrink xs:w-2/3 sm:w-1/2 scale-100 transition duration-300 hover:scale-105">
                <Link
                  to={`/content/` + item.id}
                  className="flex flex-col rounded-xl shadow-xl border dark:border-gray-100/10"
                >
                  <div className=" flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover rounded-t-xl"
                      src={blogCoverUrl + item.thumbnail}
                      alt="error"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between dark:bg-zinc-800/95  bg-white p-6 rouned-b rounded-lg ">
                    <div className="flex-1">
                      <div className="mt-2 block">
                        <p className="text-md ">
                          <span className="dark:text-teal-600 text-blue-500">
                            {item.inserted_at}
                          </span>
                        </p>
                        <p className="mt-4 text-xl font-semibold dark:text-gray-200 text-slate-800">
                          {item.title}
                        </p>

                        <div className="mt-6 flex items-center">
                          <div className="">
                            <div className="text-sm font-medium dark:text-gray-200 text-slate-900 flex flex-row transition ease-in-out duration-300 translate-x-0 hover:translate-x-2">
                              <span>Read more</span>{" "}
                              <AiOutlineDoubleRight className="dark:text-teal-500 text-blue-500 mt-1 ml-1 " />
                            </div>
                            <div className="flex space-x-1 text-sm text-gray-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
          ))
        )}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalLength={totalLength}
      />
      <Footer />
    </div>
  );
}

export default App;
