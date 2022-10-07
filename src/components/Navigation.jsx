import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import supabase from '../supabaseClient';
import Modal from '../Sub-components/Modal';
import Account from './pages/Profiles/Account';

export default function Navigation({session}) {

  const [showDropDown, setShowDropDown] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const dropDownOpener = useRef();
  const storageUrl = 'https://uytustuoqlniazcbopzo.supabase.co/storage/v1/object/avatars/';
  
  const avatarUrl = async(e) => {
    let { data, error } = await supabase
    .from('profiles')
    .select('avatar_url')
    setAvatar(storageUrl+data[0].avatar_url)
  }

  const logOut = async (e) => {

    let { error } = await supabase.auth.signOut()

  }
   
  useEffect(() => {
    avatarUrl()
}, [session])

  useEffect(() => {
    const closeDropDown = e => {
      if (e.path[0] !== dropDownOpener.current) {
        setShowDropDown(false)

      }
    }
    document.body.addEventListener('click', closeDropDown);
    return () => {
      document.body.removeEventListener('click', closeDropDown);

    }
  }, [])



  return (
    <div>
      {
        showUpdateProfileModal ? 
        (
          <Modal
       header={
        'Profile'
      }
      content={
       <Account session={session}/>
      }
     
      />
        ) : ''
      }
      
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">

                <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>

                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>

                  <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">

                <Link to="/" > <h1 className='font-bold text-xl text-sky-600'>&lt; MyBlogs &nbsp;&frasl;&gt;</h1></Link>
                
               
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">

                {session ? <div className="relative ml-3">
                  <div>
                    <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <img ref={dropDownOpener} onClick={() => setShowDropDown(!showDropDown)} className="h-8 w-8 rounded-full" src={avatar} alt="" />
                    </button>
                  </div>
                  {showDropDown ? <div onClick={(e) => e.stopPropagation()} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">

                    <Link to="/signin" className="block px-4 py-2 text-sm text-gray-700" >Sign In</Link>
                    <Link onClick={()=>{setShowUpdateProfileModal(true);setShowDropDown(false)}} to="/account"className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Update Profile</Link>
                    <Link to="/createblog" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Create Blog</Link>
                    <a href="#" onClick={logOut} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-3">Sign out</a>
                  </div> : ''}

                </div> : ''}


              </div>
            </div>
          </div>
        </div>

        {/* mobilw mwnu */}

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">

            <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
          </div>
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-5 sm:px-6">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">Tom Cook</div>
                <div className="text-sm font-medium text-gray-400">tom@example.com</div>
              </div>
              <button type="button" className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">View notifications</span>

                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2 sm:px-3">
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>

              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>

              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
