import "./index.css";
import supabase from "./supabaseClient";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "./Sub-components/LoadingScreen";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [allBlog, setAllBlog] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [itemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage] = useState(0);
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
      <div className="min-h-screen relative dark:bg-zinc-900/95 bg-white py-10 ">
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
                  <div className="flex flex-1 flex-col justify-between dark:bg-zinc-900/95  bg-white p-6 rouned-b rounded-lg ">
                    <div className="flex-1">
                      <div className="mt-2 block">
                        <p className="text-xl font-semibold dark:text-gray-200 text-slate-800">
                          {item.title}
                        </p>

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
                            <h3 className="text-sm font-medium text-gray-700">
                              <p
                                href="#"
                                className="text-md dark:text-gray-200 text-slate-800"
                              >
                                {item.profiles.username}
                              </p>
                              <p className="text-xs dark:text-teal-600 text-blue-500">
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
