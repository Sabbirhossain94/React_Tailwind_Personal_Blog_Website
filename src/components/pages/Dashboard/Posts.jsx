import React from 'react'
import useFetchBlogs from '../../../hooks/useFetchBlogs'
import { Modal, Button } from 'flowbite-react';
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';

function Posts() {
  const { loading, blogs, error } = useFetchBlogs();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div >
      <div className='flex justify-end'>
        <Link to="createblog">
          <button className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Create new
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto border border-zinc-300 dark:border-zinc-700 mt-4">
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-200">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-zinc-900/50 dark:text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog title
              </th>
              <th scope="col" className="px-6 py-3">
                Introduction
              </th>
              <th scope="col" className="px-6 py-3">
                Created at
              </th>
              <th scope="col" className="px-6 py-3">
                Updated at
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs && blogs.map((blog, key) => (
              <tr key={key} className="odd:bg-white dark:text-gray-400 odd:dark:bg-zinc-800 even:bg-gray-100 even:dark:bg-zinc-900/50 border-b dark:border-zinc-700">
                <td className="px-6 py-4 font-medium whitespace-nowrap ">
                  {blog.title}
                </td>
                <td className="px-6 py-4 w-1/3">
                  {blog.introduction}
                </td>
                <td className="px-6 py-4">
                  {blog.inserted_at}
                </td>
                <td className="px-6 py-4">
                  coming soon!
                </td>
                <td className="px-6 py-4 flex gap-4">
                  <Modal dismissible show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                          <Button color="failure" onClick={() => setOpenModal(false)}>
                            {"Yes, I'm sure"}
                          </Button>
                          <Button color="gray" onClick={() => setOpenModal(false)}>
                            No, cancel
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                  <button onClick={() => setOpenModal(true)} className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 sm:w-auto">
                    Delete
                  </button>
                  <button className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 hover:border-blue-600 bg-gray-100 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Posts