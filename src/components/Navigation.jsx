import "../../src/animation.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import Modal from "../Sub-components/Modal";
import Account from "./pages/Profiles/Account";

export default function Navigation({ session }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [openMenuIcon, setOpenMenuIcon] = useState(false);
  const dropDownOpener = useRef();
  const storageUrl =
    "https://uytustuoqlniazcbopzo.supabase.co/storage/v1/object/avatars/";

  const avatarUrl = async (e) => {
    let { data, error } = await supabase.from("profiles").select("avatar_url");
    if(error){
      console.log(error)
    } else {
    setAvatar(storageUrl + data[0].avatar_url);
    }
  };

  const logOut = async (e) => {
    let { error } = await supabase.auth.signOut();
    
  };

  useEffect(() => {
    avatarUrl();
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
      {showUpdateProfileModal ? (
        <Modal header={"Profile"} content={<Account session={session} />} />
      ) : (
        ""
      )}

      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
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
                <Link to="/">
                  <h1 className="font-bold text-xl text-sky-600">
                    &lt; MyBlogs &nbsp;&frasl;&gt;
                  </h1>
                </Link>
              </div>

              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <Link to="/">
                  <h1 className="font-bold text-xl text-sky-600">
                    &lt; MyBlogs &nbsp;&frasl;&gt;
                  </h1>
                </Link>
              </div>
            </div>
            {/*usermenu */}
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                {session ? (
                  <div className="relative ml-3">
                    <div>
                      <button
                        type="button"
                        className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          ref={dropDownOpener}
                          onClick={() => setShowDropDown(!showDropDown)}
                          className="h-8 w-8 rounded-full"
                          src={avatar}
                          alt=""
                        />
                      </button>
                    </div>
                    {showDropDown ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                      >
                        {session ? (
                          " "
                        ) : (
                          <Link
                            to="/signin"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Sign In
                          </Link>
                        )}
                        <Link
                          to="/createblog"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-2"
                        >
                          Create Blog
                        </Link>
                        <Link
                          onClick={() => {
                            setShowUpdateProfileModal(true);
                            setShowDropDown(false);
                          }}
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-1"
                        >
                          Update Profile
                        </Link>
                        <a
                          href="#"
                          onClick={logOut}
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-3"
                        >
                          Sign out
                        </a>
                      </div>
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

        {/* mobilw mwnu */}
        <div className="md:hidden">
          <div className={openMenuIcon ? "slide-down " : "slide-up "}>
            <div className={openMenuIcon ? " " : "hidden "}>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={avatar}
                      alt=""
                    />
                  </div>
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
                    to="/createblog"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Create Blog
                  </Link>
                  <Link
                    to="/account"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Update Profile
                  </Link>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
