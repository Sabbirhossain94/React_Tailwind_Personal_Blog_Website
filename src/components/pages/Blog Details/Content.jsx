import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../../services/supabaseClient";
import RecentBlogs from "../../layout/common/RecentBlogs";
import AboutMe from "../../layout/static/AboutMe";
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

  useEffect(() => {
    showBlog();
  }, []);


  return (
    <div className="min-h-screen relative bg-gray-100 dark:bg-zinc-800">
      <div className="flex max-w-7xl mx-auto gap-16 items-start py-20">
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
        <div className="w-1/4 mt-20 flex flex-col gap-10">
          <AboutMe />
          <RecentBlogs />
        </div>
      </div>
    </div>
  );
}
