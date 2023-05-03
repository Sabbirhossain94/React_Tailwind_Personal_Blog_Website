import "../../src/animation.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import supabase from "../supabaseClient";
import { AiOutlineUser } from "react-icons/ai";
import { useContext } from "react";
import { Context } from "../context";

export default function Navigation({ session }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [openMenuIcon, setOpenMenuIcon] = useState(false);
  const dropDownOpener = useRef();
  const getContext = useContext(Context);
  const [dark, setDark] = getContext.theme;
  const location = useLocation();
  const avatarFIle = async () => {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select("avatar_url");

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        const [file] = data;
        getAvatarFromStorage(file);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAvatarFromStorage = async (file) => {
    let { data, error } = await supabase.storage
      .from("avatars")
      .download(`Profile Photo/${file.avatar_url}`);
    if (data) {
      const url = URL.createObjectURL(data);
      setAvatar(url);
    } else {
      console.log(error);
    }
  };

  const logOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    avatarFIle();
    // eslint-disable-next-line
  }, [session]);

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        dropDownOpener.current &&
        !dropDownOpener.current.contains(e.target)
      ) {
        setShowDropDown(false);
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => {
      document.body.removeEventListener("click", closeDropDown);
    };
  }, [dropDownOpener, setShowDropDown]);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div>
      <nav
        className={
          "dark:bg-zinc-800/95 bg-slate-800 shadow-2xl fixed left-0 right-0 top-0 z-10 backdrop-blur-md"
        }
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {openMenuIcon ? (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700"
                  >
                    <svg
                      onClick={() => setOpenMenuIcon(false)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700"
                  >
                    <svg
                      onClick={() => setOpenMenuIcon(true)}
                      className=" block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </button>
                )}
                {/* </button> */}
                <Link to="/" className="ml-[20px] flex flex-row">
                  <h1 className="ml-1 mt-1 text-gray-400  text-md font-semibold">
                    <span className="text-teal-500">&lt;</span> Sabbir's Blog{" "}
                    <span className="text-teal-500">&nbsp;&#8725; &gt;</span>
                  </h1>
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <Link to="/" className="ml-[20px] flex flex-row">
                  <h1 className="ml-1 mt-1 text-gray-400  text-md font-semibold">
                    <span className="text-teal-500">&lt;</span> Sabbir's Blog{" "}
                    <span className="text-teal-500">&nbsp;&#8725; &gt;</span>
                  </h1>
                </Link>
              </div>
            </div>
            {/*usermenu */}
            <div className="flex items-center">
              <div className=" md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                <div className="relative ml-3  ">
                  <div className="flex flex-row">
                    <button
                      type="button"
                      ref={dropDownOpener}
                      onClick={() => setShowDropDown(!showDropDown)}
                      className="hidden md:flex rounded-full dark:bg-zinc-800 dark:border-gray-100/20 border border-gray-500/80  text-sm mt-0.5"
                    >
                      {session ? (
                        <img
                          className="h-7 w-7 rounded-full "
                          src={session ? avatar : ""}
                          alt="error"
                        />
                      ) : (
                        <AiOutlineUser className=" h-6 w-6 rounded-full dark:text-gray-500 text-gray-500/80 dark:border dark:border-gray-700" />
                      )}
                    </button>
                    {/* dark mode */}
                    <button onClick={() => setDark(!dark)} className="ml-10">
                      {dark ? (
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className=" stroke-gray-500  h-7 w-7"
                          fill="none"
                        >
                          <path
                            d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="stroke-gray-500/80  h-7 w-7"
                        >
                          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                          <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                  {/* for large screen */}
                  {showDropDown ? (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`transition-opacity duration-300 ease-in-out absolute right-20 z-10 mt-2 w-48 h-30 overflow-hidden origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    >
                      {session ? (
                        " "
                      ) : (
                        <Link
                          to="/signin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500"
                        >
                          Sign In
                        </Link>
                      )}
                      <Link
                        to={session ? "/createblog" : "/signin"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500"
                      >
                        Create Blog
                      </Link>
                      <Link
                        onClick={() => {
                          setShowDropDown(false);
                        }}
                        to={session ? "/account" : "/signin"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500"
                      >
                        Update Profile
                      </Link>
                      {session ? (
                        <a
                          href="/#"
                          onClick={logOut}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500"
                        >
                          Sign out
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile menu */}
        <div className="md:hidden relative dark:bg-zinc-900/80 right-0 left-0 z-10 h-auto ">
          <div
            className={`${
              openMenuIcon
                ? "max-h-52 transition-all duration-300 opacity-100 "
                : "max-h-0 transition duration-300 opacity-0"
            } `}
          >
            <div className={openMenuIcon ? " " : "hidden "}>
              <div className="border-t border-gray-100/10 pt-4 pb-3">
                <div className="flex items-center px-5 sm:px-6">
                  {session ? (
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={session ? avatar : ""}
                        alt="error"
                      />
                    </div>
                  ) : (
                    <AiOutlineUser className="h-8 w-8 rounded-full text-gray-500 border border-gray-600 " />
                  )}
                  <div className="ml-3">
                    {session ? (
                      <div className="text-sm font-medium text-gray-400">
                        {session.user.email}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2 sm:px-3">
                  {session ? (
                    ""
                  ) : (
                    <Link
                      to="/signin"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign In
                    </Link>
                  )}

                  <Link
                    to={session ? "/createblog" : "/signin"}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Create Blog
                  </Link>

                  <Link
                    to={session ? "/account" : "/signin"}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Update Profile
                  </Link>

                  {session ? (
                    <a
                      href="/#"
                      onClick={logOut}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign out
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
