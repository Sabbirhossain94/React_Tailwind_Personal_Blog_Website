import "../../src/animation.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import { AiOutlineUser } from "react-icons/ai";

export default function Navigation({ session }) {
  const [showDropDown, setShowDropDown] = useState(false);
  // const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [openMenuIcon, setOpenMenuIcon] = useState(false);
  const dropDownOpener = useRef();

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
  return (
    <div>
      <nav className="bg-slate-800 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700"
                >
                  {openMenuIcon ? (
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
                  ) : (
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
                  )}
                </button>
                <Link to="/" className="ml-[20px] flex flex-row">
                  <img src="blog.png" width="40px" height="20px" alt="error" />
                  <h1 className="ml-2 mt-1 text-gray-200 text-xl font-semibold">
                    Blog
                  </h1>
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <Link to="/" className="ml-[20px] flex flex-row">
                  <img src="blog.png" width="40px" height="20px" alt="error"/>
                  <h1 className="ml-1 mt-1 text-gray-200 text-xl font-semibold">
                    Blog
                  </h1>
                </Link>
              </div>
            </div>
            {/*usermenu */}
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      ref={dropDownOpener}
                      onClick={() => setShowDropDown(!showDropDown)}
                      className="flex rounded-full bg-gray-800 text-sm"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      {session ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={session ? avatar : ""}
                          alt="error"
                        />
                      ) : (
                        <AiOutlineUser className="h-7 w-7 rounded-full text-gray-500 border border-gray-600" />
                      )}
                    </button>
                  </div>
                  {/* for large screen */}
                  {showDropDown ? (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="transition duration-300 ease-in-out absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
        <div className="md:hidden relative bg-gray-800 right-0 left-0 z-10 h-auto ">
          <div
            className={`${
              openMenuIcon ? "max-h-52 " : "max-h-0"
            } transition-all duration-300 ease`}
          >
            <div className={openMenuIcon ? " " : "hidden "}>
              <div className="border-t border-gray-700 pt-4 pb-3">
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
