import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../../../services/global/supabaseClient";
import RecentBlogs from "../../layout/common/RecentBlogs";
import AboutMe from "../../layout/static/AboutMe";
import { blogCoverUrl } from "../../../helpers/storage";
import { SingleBlogSkeleton } from "../../layout/skeleton/Skeleton";
import DOMPurify from 'dompurify';

export default function Content() {
  const location = useLocation();
  const { pathname } = location;
  const slug = pathname.split("/")[2]
  const [singleBlog, setSingleBlog] = useState([]);
  const [loading, setLoading] = useState(false);

  const showBlog = async () => {
    setLoading(true)
    let { data, error } = await supabase
      .from("blogs")
      .select(`*,profiles(*)`)
      .eq("slug", slug);
    if (error) {
      console.log(error);
    } else {
      setSingleBlog(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    showBlog();
  }, [slug]);


  return (
    <div className="min-h-screen relative bg-gray-100 dark:bg-zinc-800">
      <div className="flex flex-col xl:flex-row w-full xl:max-w-7xl mx-auto gap-16 items-start py-20 px-6 sm:px-10 lg:px-6 xl:px-0">
        {loading ? <SingleBlogSkeleton /> : singleBlog.map((blog, key) => (
          <div
            key={key}
            className="overflow-hidden w-full xl:w-3/4 mt-20 bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-700"
          >
            <div className="relative">
              <div className="flex flex-col justify-center">
                <img
                  src={blogCoverUrl + blog.thumbnail}
                  className="w-full"
                />
                <div className="mt-4 px-6">
                  <p className="text-4xl font-bold dark:text-gray-200">
                    {blog.title}
                  </p>
                </div>

                <div className="mt-3 px-6 flex flex-col sm:flex-row gap-4 items-start">
                  <p className="text-md text-gray-600 dark:text-gray-400">
                    {blog.inserted_at} By <span className='text-blue-500 dark:text-teal-500'>Sabbir Hossain</span>
                  </p>
                  <span className="text-[10px] font-semibold bg-blue-50 dark:bg-teal-900/30 rounded-xl border border-blue-500 dark:border-teal-500 px-2 py-[2px] dark:text-teal-600 text-blue-500">
                    {blog.topic}
                  </span>
                </div>
                <div className="mt-8 w-full mx-auto border-t-[0.5px] border-zinc-300 dark:border-zinc-700 "></div>
              </div>
            </div>
            <div className="mt-8 pb-6 px-2 lg:mt-0">
              <div className="ql-snow mt-5 dark:text-gray-200 lg:col-start-1 lg:row-start-1 lg:max-w-none">
                <div
                  className='ql-editor'
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="w-full xl:w-1/4 mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-10">
          <AboutMe />
          <RecentBlogs loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}
