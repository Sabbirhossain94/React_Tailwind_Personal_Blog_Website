import { useState, useEffect } from "react";
import { useLocation, Link,useNavigate } from "react-router-dom";
import UploadCoverImage from "./UploadCoverImage";
import { MdKeyboardBackspace } from "react-icons/md";
import ReactQuill from "react-quill";
import { modules } from "../../../helpers/textEditor";
import { createBlog } from "../../../services/blogs/createBlog";
import { loadBlogContent } from "../../../services/blogs/loadBlogContent";
import { updateBlog } from "../../../services/blogs/updateBlog";
import 'react-quill/dist/quill.snow.css';

export default function CreateBlog({ session }) {
  const navigate = useNavigate()
  let location = useLocation();
  let currentPath = location.pathname.split("/");
  let slug = currentPath[3];
  const isCreate = currentPath.includes("createblog")
  const [file, setFile] = useState(null)
  const [blog, setBlog] = useState({
    id: null,
    title: "",
    introduction: "",
    slug: "",
    content: "",
    coverphoto: null
  })
  const [loading, setLoading] = useState(false)

  // adding blogs to database here
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreate) {
      createBlog(session, blog, file, navigate)
    } else {
      updateBlog(session, blog, file, navigate)
    }
  };

  useEffect(() => {
    if (!isCreate) {
      loadBlogContent(slug, setBlog, setLoading);
    }
  }, [isCreate]);

  const resetForm = () => {
    setBlog({
      title: "",
      introduction: "",
      content: "",
      coverphoto: null
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.startsWith(" ")) {
      return;
    }
    setBlog((prev) => {
      const updatedBlog = { ...prev, [name]: value };
      if (name === "title") {
        updatedBlog.slug = value.toLowerCase().split(" ").join("-");
      }
      return updatedBlog;
    });
  };

  const handleEditorChange = (value) => {
    setBlog((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 min-h-screen">
      <Link to="/dashboard/posts">
        <button className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 sm:w-auto">
          <span className="text-lg"> <MdKeyboardBackspace /></span>
          <span className="ml-2">Blogs</span>
        </button>
      </Link>
      <div className="mt-4 mx-auto px-8 xl:px-0">
        <form
          onSubmit={handleSubmit}
        >
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-700">
            <div className="space-y-6 px-4 py-5 sm:p-6 ">
              <div>
                <UploadCoverImage
                  isCreate={isCreate}
                  blog={blog}
                  setFile={setFile}
                  loading={loading}
                />
                <label
                  htmlFor="title"
                  className="mt-8 block text-sm font-medium text-blue-500 dark:text-teal-500"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    defaultValue={blog.title}
                    id="title"
                    name="title"
                    onChange={handleChange}
                    className="w-full border p-2 dark:text-white bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 mt-1 h-8 block shadow-sm sm:text-sm "
                    required
                  />
                </div>
                {blog.title &&
                  <>
                    <label
                      htmlFor="slug"
                      className="mt-8 block text-sm font-medium text-blue-500 dark:text-teal-500"
                    >
                      Slug
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={blog.slug}
                        id="slug"
                        name="slug"
                        onChange={handleChange}
                        className="w-full border p-2 dark:text-white bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 mt-1 h-8 block shadow-sm sm:text-sm "
                        required
                      />
                    </div>
                  </>
                }
                <div className="mt-8">
                  <label
                    htmlFor="introduction"
                    className="mt-8 block text-sm font-medium text-blue-500 dark:text-teal-500"
                  >
                    Introduction
                  </label>
                  <textarea
                    type="text"
                    defaultValue={blog.introduction}
                    name="introduction"
                    id="introduction"
                    onChange={handleChange}
                    required
                    className="w-full border dark:text-white bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 p-2 mt-1 h-8 block shadow-sm sm:text-sm " />
                </div>
                <div className="mt-8 ">
                  <label
                    htmlFor="content"
                    className="mt-5 lock text-sm font-medium text-blue-500 dark:text-teal-500"
                  >
                    Content
                  </label>
                  <div>
                    <ReactQuill
                      id="content"
                      className="bg-gray-100 dark:bg-zinc-800 mt-[10px] border-none dark:text-white"
                      value={blog.content}
                      onChange={handleEditorChange}
                      modules={modules}
                      theme="snow"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900/10 px-4 pt-8 pb-6 text-right sm:px-6">
              {isCreate && <button
                onClick={resetForm}
                type="button"
                className="inline-flex justify-center border border-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition duration-300 dark:border-zinc-700 py-2 px-4 mr-4 text-sm font-medium text-blue-500 dark:text-teal-500"
              >
                Cancel
              </button>}
              <button
                type="submit"
                className="inline-flex justify-center border border-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition duration-300 dark:border-zinc-700 py-2 px-4 mr-4 text-sm font-medium text-blue-500 dark:text-teal-500"
              >
                {isCreate ? "Create" : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
