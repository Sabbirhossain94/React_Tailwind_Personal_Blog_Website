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
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

export default function Content({ session }) {
  const params = useParams();
  const [singleBlog, setSingleBlog] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [_, setAvatar] = useState(null);
  const navigate = useNavigate();
  const blogCoverUrl = process.env.REACT_APP_STORAGE_PUBLIC_URL;

  const showBlog = async () => {
    let { data, error } = await supabase
      .from("blogs")
      .select(`*,profiles(*)`)
      .eq("slug", params.id);
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
    <div className="min-h-screen relative bg-gray-100 dark:bg-zinc-800">
      <AnimatedPage>
        <div className="flex max-w-7xl mx-auto gap-8 items-start py-20">
          {singleBlog.map((item, key) => (
            <div
              key={key}
              className="overflow-hidden w-3/4 mt-20 bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-700"
            >
              <div className="relative">
                <div className="flex flex-col justify-center">
                  <div className="relative flex flex-row items-center w-full">
                    {/* {session ? (
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
                      )} */}
                  </div>
                  <img
                    src={blogCoverUrl + item.thumbnail}
                    className="w-full"
                  />
                  <div className="mt-4 px-8">
                    <p className="text-4xl font-bold dark:text-gray-200">
                      {item.title}
                    </p>
                  </div>

                  <div className="mt-3 px-8">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.inserted_at} By <span className='text-blue-500 dark:text-teal-500'>Sabbir Hossain</span>
                    </p>
                  </div>
                  <div className="mt-8 w-[93%] mx-auto border-t-[0.5px] border-zinc-300 dark:border-zinc-700 "></div>
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
              <div className="mt-8 lg:mt-0 px-6">
                <div className="ql-snow mx-auto mt-5 dark:text-gray-200 lg:col-start-1 lg:row-start-1 lg:max-w-none">
                  <div
                    className='ql-editor'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="w-1/4 border border-zinc-300 dark:border-zinc-700 mt-20">
            <div className=" dark:border-zinc-300 p-4 bg-white dark:bg-zinc-900/50">
              <h2 className="text-2xl dark:text-gray-200 font-semibold">About Me</h2>
              <div className="pt-6">
                <img className="rounded-md border dark:border-none" src='/me.jpg' />
              </div>
              <div className="pt-6">
                <p className="text-[#666] dark:text-gray-400">I am a Web Application Developer with professional experience in building responsive, scalable, and efficient web applications. My passion lies in crafting intuitive user interfaces that enhance user experiences while ensuring high performance and maintainability. I am continually learning new technologies and improving my skills in web development, with a focus on delivering high-quality user experiences. I thrive in collaborative environments and am excited about contributing to innovative projects.</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </div>
  );
}
