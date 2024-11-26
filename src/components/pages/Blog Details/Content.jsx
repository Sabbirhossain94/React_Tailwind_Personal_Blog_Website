import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../../services/supabaseClient";
import { SingleBlogSkeleton } from "../../layout/skeleton/Skeleton";
import DOMPurify from 'dompurify';

export default function Content() {
  const params = useParams();
  const [singleBlog, setSingleBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const blogCoverUrl = process.env.REACT_APP_STORAGE_PUBLIC_URL;

  const showBlog = async () => {
    setLoading(true)
    let { data, error } = await supabase
      .from("blogs")
      .select(`*,profiles(*)`)
      .eq("slug", params.id);
    if (error) {
      console.log(error);
    } else {
      setSingleBlog(data);
    }
    setLoading(false);
  };

  // const deleteBlog = async (id) => {
  //   const { data, error } = await supabase
  //     .from("blogs")
  //     .delete()
  //     .match({ id: id });
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     navigate("/");
  //   }
  // };

  useEffect(() => {
    showBlog();
  }, []);


  return (
    <div className="min-h-screen relative bg-gray-100 dark:bg-zinc-800">
      <div className="flex max-w-7xl mx-auto gap-8 items-start py-20">
        {loading ? <SingleBlogSkeleton /> : singleBlog.map((item, key) => (
          <div
            key={key}
            className="overflow-hidden w-3/4 mt-20 bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-700"
          >
            <div className="relative">
              <div className="flex flex-col justify-center">
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
    </div>
  );
}
