import "./index.css";
import supabase from "./supabaseClient";
// import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "./Sub-components/LoadingScreen";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [allBlog, setAllBlog] = useState([]);
  const [blogLength, setblogLength] = useState(null);
  const [avatar, setAvatar] = useState(null);
  // let location = useLocation();
  const blogCoverUrl = process.env.REACT_APP_STORAGE_PUBLIC_URL;

  // if (location.search) {
  //   currentPage = parseInt(
  //     location.search.substring(location.search.indexOf("=") + 1)
  //   );
  // } else {
  //   currentPage = 1;
  // }

  const totalBlogs = async () => {
    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from("blogs")
        .select(`*,profiles(*)`);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setblogLength(data.length);
        setAllBlog(data);
        const [file] = data;
        getAvatarFromStorage(file.profiles.avatar_url);
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
  }, []);

  return (
    <div className=" min-h-screen relative">
      {loading ? (
        <LoadingScreen />
      ) : (
        allBlog.map((item, key) => (
          <li key={key} className="list-none  ">
            <div className=" relative mx-auto mt-12 grid max-w-lg gap-5 flex-shrink xs:w-2/3 sm:w-1/2 scale-100 transition duration-300 hover:scale-105">
              <Link
                to={`/content/` + item.id}
                className="flex flex-col rounded-xl shadow-lg"
              >
                <div className=" flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover rounded-md"
                    src={blogCoverUrl + item.thumbnail}
                    alt="error"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-gray-50 p-6">
                  <div className="flex-1">
                    <div className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-700">
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
                          <h3 className="text-sm font-medium text-gray-700">
                            <p href="#" className="text-md">
                              {item.profiles.username}
                            </p>
                            <p href="#" className="text-xs text-indigo-600">
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
      <Footer />
    </div>
  );
}

export default App;
