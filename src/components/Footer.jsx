import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { SiGmail } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="text-gray-600 mx-auto body-font flex justify-center items-center py-10 dark:bg-zinc-900/50 bg-slate-800 relative bottom-0 left-0 right-0">
      <div className="container px-32 flex items-center sm:flex-row flex-col">
        <p className="font-semibold text-sm text-gray-200 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-teal-500 sm:py-1 sm:mt-0 mt-4">
          © 2024 Personal Blog , All rights reserved
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            href="https://www.linkedin.com/in/sabbir-hossain-b73726214/"
            className="cursor-pointer text-gray-500 text-xl rounded-md p-1"
          >
            <BsLinkedin className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300" />
          </a>
          <a
            href="https://github.com/Sabbirhossain97"
            className="cursor-pointer ml-3 text-gray-500 text-xl rounded-md p-1"
          >
            <AiFillGithub className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300" />
          </a>
          <a
            href="https://sabbirontheweb.com/"
            className="cursor-pointer ml-3 text-gray-500 text-xl rounded-md p-1"
          >
            <MdWork className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300" />
          </a>
          <a
            href="mailto:sabbirhossainbd199@gmail.com"
            className="ml-3 text-gray-500 text-xl rounded-md p-1"
          >
            <SiGmail className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300" />
          </a>
        </span>
      </div>
    </footer>
  );
}
