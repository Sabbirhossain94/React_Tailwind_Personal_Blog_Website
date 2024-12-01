import { useState } from "react";
import { signOut } from "../../../services/auth/signOut";
import { Link } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useDarkMode from "../../../hooks/useDarkMode";
import useProfile from "../../../hooks/useProfile";
import { DarkIcon, LightIcon, MenuIcon, CloseIcon } from "../../svg/Svg";
import { useSessionContext } from "../../../context/SessionContext";

export default function Navigation() {
  const session = useSessionContext();
  const [openMenuIcon, setOpenMenuIcon] = useState(false);
  const { ref, showDropDown, setShowDropDown } = useOutsideClick();
  const { dark, toggleDarkMode } = useDarkMode(false);
  const { profile } = useProfile(session);

  return (
    <nav
      className={
        "dark:bg-zinc-900 z-50 bg-white border-b border-zinc-300 dark:border-zinc-700 fixed left-0 right-0 top-0 backdrop-blur-md"
      }
    >
      <div className="mx-auto max-w-7xl ">
        <div className="flex h-[70px] justify-between">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              {openMenuIcon ? (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700"
                >
                  <CloseIcon setOpenMenuIcon={setOpenMenuIcon} />
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700"
                >
                  <MenuIcon setOpenMenuIcon={setOpenMenuIcon} />
                </button>
              )}
              {/* </button> */}
              <Link to="/" className="ml-[20px] flex flex-row">
                <h1 className="dark:text-gray-200 mt-1 text-md font-semibold">
                  <span className="text-blue-500 dark:text-teal-500">&lt;</span> Sabbir's Blog{" "}
                  <span className="text-blue-500 dark:text-teal-500">&nbsp;&#8725; &gt;</span>
                </h1>
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4 ">
              <Link to="/" className="flex flex-row">
                <h1 className="dark:text-gray-200 mt-1 text-xl font-semibold">
                  <span className="text-blue-500 dark:text-teal-500">&lt;</span> Sabbir's Blog{" "}
                  <span className="text-blue-500 dark:text-teal-500">&nbsp;&#8725; &gt;</span>
                </h1>
              </Link>
            </div>
          </div>

          {/*usermenu */}
          <div ref={ref} className="flex items-center">
            <div className="md:ml-4 md:flex md:flex-shrink-0 md:items-center">
              <div className="relative ml-3">
                <div className="flex flex-row">
                  {session ? (
                    <img
                      onClick={() => setShowDropDown(!showDropDown)}
                      className="cursor-pointer h-8 w-8 rounded-full border-2 object-cover"
                      src={session ? profile?.avatarUrl : ""}
                      alt="error"
                    />
                  ) : (
                    <Link
                      to="/signin"
                    >
                      <button className="h-8 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 sm:w-auto">
                        Sign In
                      </button>
                    </Link>
                  )}
                  {/* dark mode */}
                  <button onClick={toggleDarkMode} className="ml-10">
                    {dark ? (
                      <DarkIcon />
                    ) : (
                      <LightIcon />
                    )}
                  </button>
                </div>
                {/* for large screen */}
                {showDropDown ? (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute right-20 z-10 mt-2 w-60 h-30 overflow-hidden border dark:border-zinc-700 origin-top-right bg-white border-zinc-300 dark:bg-zinc-800 py-1 shadow-lg`}
                  >
                    <p
                      className="border-b border-gray-300 dark:border-zinc-500 block px-4 py-2 text-sm text-gray-700 dark:text-gray-400"
                    >
                      Signed in as <span className="italic">{session?.user?.email}</span>
                    </p>
                    <Link
                      to={session && "/dashboard"}
                      className="block px-4 py-2 mt-2 text-sm text-gray-700 hover:text-blue-500 dark:text-gray-400 dark:hover:text-teal-500"
                    >
                      Dashboard
                    </Link>
                    {session ? (
                      <p
                        onClick={signOut}
                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 dark:text-gray-400 dark:hover:text-teal-500"
                      >
                        Sign out
                      </p>
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
      {/* <div className="md:hidden relative dark:bg-zinc-900/80 right-0 left-0 z-10 h-auto ">
        <div
          className={`${openMenuIcon
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
                  to={session && "/dashboard"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500"
                >
                  Dashboard
                </Link>

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
                    onClick={signOut}
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
      </div> */}
    </nav>
  );
}
