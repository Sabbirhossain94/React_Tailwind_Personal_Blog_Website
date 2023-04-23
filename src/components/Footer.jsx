import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { SiGmail } from "react-icons/si";

export default function Footer() {
  return (
    <div>
      <div className="shadow-xl">
        <footer className="shadow text-gray-600 body-font flex justify-center items-center py-10 dark:bg-zinc-900 bg-slate-800 relative bottom-0 left-0 right-0 w-full">
          <div className="container px-5  mx-auto flex items-center sm:flex-row flex-col">
            {/* <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <img src="blog.png" className="w-10 h-10 text-white p-2 " />
              <span className="text-md text-gray-300">Sabbir's Blog</span>
            </a> */}
            <p className="font-semibold text-sm text-gray-300 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-300 sm:py-1 sm:mt-0 mt-4">
              © 2023 Personal Blog , All rights reserved
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <a
                href="https://www.linkedin.com/in/sabbir-hossain-b73726214/"
                className="cursor-pointer text-gray-500 text-xl hover:bg-slate-700 rounded-md p-1"
              >
                <BsLinkedin />
              </a>
              <a
                href="https://github.com/Sabbirhossain97"
                className="cursor-pointer ml-3 text-gray-500 text-xl hover:bg-slate-700 rounded-md p-1"
              >
                <AiFillGithub />
              </a>
              <a
                href="https://sabbirontheweb.com/"
                className="cursor-pointer ml-3 text-gray-500 text-xl hover:bg-slate-700 rounded-md p-1"
              >
                <MdWork />
              </a>
              <a
                href="mailto:sabbirhossainbd199@gmail.com"
                className="ml-3 text-gray-500 text-xl hover:bg-slate-700 rounded-md p-1"
              >
                <SiGmail />
              </a>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
