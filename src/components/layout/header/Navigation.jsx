import { signOut } from "../../../services/auth/signOut";
import { Link, useNavigate } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useDarkMode from "../../../hooks/useDarkMode";
import { useProfile } from "../../../context/ProfileContext";
import { DarkIcon, LightIcon } from "../../svg/Svg";
import Logo from "../static/Logo";

export default function Navigation() {
  const { session, profile } = useProfile();
  const { ref, showDropDown, setShowDropDown } = useOutsideClick();
  const { dark, toggleDarkMode } = useDarkMode(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    setShowDropDown(!showDropDown)
  }

  const handleRoute = () => {
    navigate("/dashboard")
    setShowDropDown(!showDropDown)
  }

  return (
    <nav className="dark:bg-zinc-900 z-50 bg-white border-b border-zinc-300 dark:border-zinc-700 fixed left-0 right-0 top-0 backdrop-blur-md">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-6 xl:max-w-7xl xl:px-0">
        <div className="flex h-[80px] justify-between">
          <Logo />
          <div ref={ref} className="flex items-center">
            <div className="md:ml-4 md:flex md:flex-shrink-0 md:items-center">
              <div className="relative ml-3">
                <div className="flex flex-row gap-6">
                  {session ? (
                    <img
                      onClick={() => setShowDropDown(!showDropDown)}
                      className="cursor-pointer h-7 w-7 rounded-full ring-2 ring-blue-500 dark:ring-teal-500 object-cover"
                      src={profile && profile.avatarUrl}
                      alt="error"
                    />
                  ) : (
                    <Link
                      to="/signin"
                    >
                      <button className="h-8 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 sm:w-auto">
                        Sign In
                      </button>
                    </Link>
                  )}

                  <button onClick={toggleDarkMode} className="">
                    {dark ? (
                      <DarkIcon />
                    ) : (
                      <LightIcon />
                    )}
                  </button>
                </div>
                {showDropDown ? (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute right-20 z-10 mt-2 w-60 h-30 overflow-hidden border dark:border-zinc-700 origin-top-right bg-white border-zinc-300 dark:bg-zinc-800 py-1 shadow-lg`}
                  >
                    <p
                      className="border-b border-gray-300 dark:border-zinc-500 block px-4 py-2 text-sm text-gray-700 dark:text-gray-400"
                    >
                      Signed in as <span className="italic text-blue-500 dark:text-teal-500">{session?.user?.email}</span>
                    </p>

                    <button
                      onClick={handleRoute}
                      className="block px-4 py-2 mt-2 text-sm text-gray-700 hover:text-blue-500 dark:text-gray-400 dark:hover:text-teal-500"
                    >
                      Dashboard
                    </button>
                    {session ? (
                      <button
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 dark:text-gray-400 dark:hover:text-teal-500"
                      >
                        Sign out
                      </button>
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
    </nav>
  );
}
