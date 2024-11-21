import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import AnimatedPage from "../../Sub-components/SlideAnimation";
import Footer from "../Footer";
import Modal from "../../Sub-components/Modal";
import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import ShareButtons from "../../Sub-components/ShareButtons";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

export default function Content({ session }) {
  const params = useParams();
  const [singleBlog, setSingleBlog] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const blogCoverUrl = process.env.REACT_APP_STORAGE_PUBLIC_URL;
  const profilePhotoUrl = process.env.REACT_APP_STORAGE_PROFILE_PHOTO_URL;
  console.log(profilePhotoUrl);

  const showBlog = async () => {
    let { data, error } = await supabase
      .from("blogs")
      .select(`*,profiles(*)`)
      .eq("id", params.id);
    if (error) {
      console.log(error);
    } else {
      setSingleBlog(data);
      const [photo] = data;
      setAvatar(photo?.profiles?.avatar_url);
      // console.log(avatar);
    }
  };
  const deleteBlog = async (id) => {
    const { data, error } = await supabase
      .from("blogs")
      .delete()
      .match({ id: id });
    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    showBlog();
  }, []);
  const handleModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <ShareButtons />
      <div className="min-h-screen relative dark:bg-zinc-900/90">
        <AnimatedPage>
          <div className="flex justify-center">
            {singleBlog.map((item, key) => (
              <div className="flex w-4/5 items-center">
                <div
                  key={key}
                  className="overflow-hidden mt-32  border border-gray-200 dark:border-zinc-700 shadow"
                >
                  <div className="mt-12 relative max-w-full py-16 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-8">
                      <div className="flex">
                        <div className="flex flex-col justify-center mx-auto">
                          <div className="relative flex flex-row items-center w-full">
                            {/* <div className=" flex flex-row items-center w-1/2">
                              <div className="flex-shrink-0 ">
                                <div>
                                  <img
                                    className="h-12 w-12 rounded-full object-fit"
                                    src={profilePhotoUrl + avatar}
                                    alt="error"
                                  />
                                </div>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-md font-medium">
                                  <p className="text-md dark:text-gray-300">
                                    Sabbir Hossain
                                  </p>
                                  <p className="text-xs dark:text-gray-400">
                                    Published on{" "}
                                    <span className="text-indigo-600 dark:text-teal-500">
                                      {item.inserted_at}
                                    </span>
                                  </p>
                                </h3>
                              </div>
                            </div> */}
                            {session ? (
                              <div className=" w-full flex flex-row justify-end">
                                <div className=" cursor-pointer ml-2 top-[1.2rem]">
                                  <Link to={`/blog/` + item.id + `/update`}>
                                    <button
                                      type="submit"
                                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                      Update
                                    </button>
                                  </Link>
                                </div>{" "}
                                <div className="cursor-pointer  ml-2 top-[1.2rem]">
                                  <button
                                    onClick={handleModal}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="w-1/2 h-full flex flex-row justify-end items-center">
                                <a href="mailto:sabbirhossainbd199@gmail.com">
                                  <SiGmail
                                    className="text-xl ml-4 text-slate-800 dark:text-gray-500 transition ease-in-out scale-90 hover:scale-100"
                                    title="Gmail"
                                  />
                                </a>

                                <a href="https://www.linkedin.com/in/sabbir-hossain-b73726214/">
                                  <BsLinkedin
                                    className="text-xl ml-4 text-slate-800 dark:text-gray-500 transition ease-in-out scale-90 hover:scale-100"
                                    title="linkedIn"
                                  />
                                </a>
                                <a href="https://github.com/Sabbirhossain97">
                                  <AiFillGithub
                                    className="text-xl ml-4 text-slate-800 dark:text-gray-500 transition ease-in-out scale-90 hover:scale-100"
                                    title="Github"
                                  />
                                </a>
                                <a href="https://sabbir-hossain-six.vercel.app/">
                                  <MdWork
                                    className="text-xl ml-4 text-slate-800 dark:text-gray-500 transition ease-in-out scale-90 hover:scale-100"
                                    title="Portfolio"
                                  />
                                </a>
                              </div>
                            )}
                          </div>
                          <img
                            src={blogCoverUrl + item.thumbnail}
                            className="mt-8 w-full"
                          />
                          <div className="mt-3">
                            <p className="text-md dark:text-gray-400">
                              {item.inserted_at} By Sabbir Hossain
                            </p>
                          </div>
                          <div className="mt-4 border border-gray-200 dark:border-zinc-700 "></div>
                          {openModal ? (
                            <div>
                              {" "}
                              <Modal
                                deleteBlog={deleteBlog}
                                itemId={item.id}
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                              />{" "}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 px-8 lg:grid lg:grid-cols-1 lg:max-w-4xl lg:mx-auto lg:gap-8">
                      <div className="mt-8 lg:mt-0">
                        <div className="ql-snow mx-auto mt-5 dark:text-gray-400 lg:col-start-1 lg:row-start-1 lg:max-w-none">
                          <div
                            className='ql-editor'
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-black w-2/5">
                  This is second section
                </div>
              </div>
            ))}
          </div>
        </AnimatedPage>
      </div>
      <Footer />
    </div>
  );
}
