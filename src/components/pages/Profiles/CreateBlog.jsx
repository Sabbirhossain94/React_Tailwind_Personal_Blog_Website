import React from "react";
import { useState, useEffect, useRef } from "react";
import supabase from "../../../supabaseClient";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UploadCoverImage from "./UploadCoverImage";
import Footer from "../../Footer";
import moment from "moment";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function CreateBlog({ session }) {
  const params = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  let getString = location.pathname;
  const [title, setTitle] = useState(" ");
  const [introduction, setIntroduction] = useState('')
  const [content, setContent] = useState("");
  const [message, setMessage] = useState({});
  const [preview, setPreview] = useState(null);
  const [coverphoto, setCoverPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const date = moment().format("MMMM D, YYYY");

  // adding records to database here
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      updateBlogContent();
      uploadToStorage();
    } else {
      createBlog(e);
      uploadToStorage();
    }
  };

  const createBlog = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("blogs")
      .insert({
        user_id: session.user.id,
        title: title,
        introduction: introduction,
        content: content,
        inserted_at: date,
        thumbnail: coverphoto,
      })
      .single();

    if (error) {
      setMessage({
        type: "Error",
        msg: "Error creating blog! please try again!",
        remove: () => setMessage({}),
      });
    } else {
      setMessage({
        type: "Success",
        msg: "Successfully Saved The Blog Post",
        remove: () => setMessage({}),
      });
      navigate("/");
    }
  };

  const uploadToStorage = async () => {
    let { error: uploadError } = await supabase.storage
      .from("thumbnail")
      .upload("Thumbnail/" + coverphoto, file);
    if (uploadError) {
      console.log(uploadError);
    }
  };

  const loadBlogContent = async () => {
    let { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", params.id);

    if (error) {
      console.log(error);
    } else {
      setTitle(data[0].title);
      setIntroduction(data[0].introduction)
      setContent(data[0].content);
      setCoverPhoto(data[0].thumbnail);
    }
  };

  const updateBlogContent = async () => {
    const { error } = await supabase
      .from("blogs")
      .update({
        user_id: session.user.id,
        title: title,
        introduction: introduction,
        content: content,
        inserted_at: date,
        thumbnail: coverphoto,
      })
      .match({ slug: params.id });
    if (error) {
      setMessage({
        type: "Error",
        msg: error.message,
        remove: () => setMessage({}),
      });
    } else {
      setMessage({
        type: "Success",
        msg: "Successfully Saved The Blog Post",
        remove: () => setMessage({}),
      });
      navigate("/");
    }
  };

  useEffect(() => {
    if (params.id !== undefined) {
      loadBlogContent();
    }
  }, [params.id]);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['code-block'],
        ['clean'],
      ],
      // handlers: {
      //   image: handleImageUpload, // Handle custom image upload
      // },
    },
  }

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 ">
      <div className=" mx-auto px-8 xl:px-0">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="bg-white dark:bg-zinc-900/50 sm:rounded-md border border-zinc-300 dark:border-zinc-700">
            <div className="space-y-6 px-4 py-5 sm:p-6 ">
              <div>
                <UploadCoverImage
                  setCoverPhoto={setCoverPhoto}
                  setFile={setFile}
                  preview={preview}
                  setPreview={setPreview}
                />
                <label
                  htmlFor="about"
                  className="mt-8 block text-sm font-medium text-blue-500 dark:text-teal-500"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    id="title"
                    name="title"
                    className="w-full border p-2 dark:text-white bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 mt-1 h-8 block shadow-sm sm:text-sm "
                    required
                  />

                </div>
                <div className="mt-8">
                  <label
                    htmlFor="introduction"

                    className="mt-8 block text-sm font-medium text-blue-500 dark:text-teal-500"
                  >
                    Introduction
                  </label>
                  <textarea value={introduction} id="introduction" onChange={(e) => setIntroduction(e.target.value)} className="w-full border dark:text-white bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 p-2 mt-1 h-8 block shadow-sm sm:text-sm " />
                </div>
                <div className="mt-8 ">
                  <label
                    htmlFor="comment"
                    className="mt-5 lock text-sm font-medium text-blue-500 dark:text-teal-500"
                  >
                    Content
                  </label>
                  <div className="max-h-[400px] overflow-y-auto">
                    <ReactQuill
                      className="bg-gray-100 dark:bg-zinc-800 mt-[10px] border-none dark:text-white"
                      value={content}
                      onChange={(newContent) => setContent(newContent)}
                      modules={modules}
                      theme="snow"
                    />
                  </div>

                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900/10 px-4 pt-8 pb-6 text-right sm:px-6">
              <button
                type="submit"
                onClick={() => navigate("/")}
                className="inline-flex justify-center border border-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition duration-300 dark:border-zinc-700 py-2 px-4 mr-4 text-sm font-medium text-blue-500 dark:text-teal-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center border border-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition duration-300 dark:border-zinc-700 py-2 px-4 mr-4 text-sm font-medium text-blue-500 dark:text-teal-500"
              >
                {getString === "/createblog" ? "Post" : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
