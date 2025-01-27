import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import RecentBlogs from "../../layout/common/RecentBlogs";
import AboutMe from "../../layout/static/AboutMe";
import { SingleBlogSkeleton } from "../../layout/skeleton";
import { loadBlogContent } from "../../../services/blogs/loadBlogContent";
import Comments from "./Comments/Comments";
import moment from 'moment';

export default function Content() {
  const location = useLocation();
  const { pathname } = location;
  const slug = pathname.split("/")[2]
  const [blog, setBlog] = useState({})
  const [loading, setLoading] = useState(false);

  const showBlog = useCallback(async () => {
    try {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const blogData = await loadBlogContent(slug);
      setBlog(blogData);
    } catch (error) {
      console.error("Failed to load blog content:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    showBlog();
  }, [showBlog]);

  return (
    <div className="min-h-screen relative bg-gray-100 dark:bg-zinc-800">
      <div className="flex flex-col relative xl:flex-row w-full xl:max-w-7xl mx-auto gap-16 items-start py-20 px-6 sm:px-10 lg:px-6 xl:px-0">
        <div className="flex flex-col w-full xl:w-3/4">
          {loading ? <SingleBlogSkeleton /> :
            (
              <div
                className="overflow-hidden w-full mt-20 bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-700"
              >
                <div className="relative">
                  <div className="flex flex-col justify-center">
                    <img
                      src={blog && blog.coverphoto}
                      className="w-full"
                      loading="lazy"
                      alt="blog cover"
                      style={{ height: 'auto' }}
                    />
                    <div className="mt-4 px-6">
                      <p className="text-4xl font-bold dark:text-gray-200">
                        {blog.title}
                      </p>
                    </div>

                    <div className="mt-3 px-6 flex flex-col sm:flex-row gap-4 items-start">
                      <p className="text-md text-gray-600 dark:text-gray-400">
                        {moment(blog.inserted_at).format("MMMM D, YYYY")} By <span className='text-blue-500 dark:text-teal-500'>Sabbir Hossain</span>
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
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </div>
                </div>
              </div>
            )}
          <Comments blogId={blog.id} />
        </div>
        <div className="w-full xl:w-1/4 mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-10">
          <AboutMe />
          <RecentBlogs loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}
