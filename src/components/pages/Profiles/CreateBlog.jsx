import React from "react";
import { useState, useEffect, useRef } from "react";
import supabase from "../../../supabaseClient";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import JoditEditor from "jodit-react";
import Notification from "../../../Sub-components/Notification";
import UploadCoverImage from "./UploadCoverImage";

export default function CreateBlog({ session }) {
  const params = useParams();
  let location = useLocation();
  let getString = location.pathname;
  const editor = useRef(null);
  const [title, setTitle] = useState(" ");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState({});
  const [preview, setPreview] = useState(null);
  const [coverphoto, setCoverPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const date = new Date().toLocaleString();
  // adding records to database here

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      updateBlogContent(e);
      uploadToStorage(e);
    } else {
      createBlog(e);
      uploadToStorage(e);
    }
  };

  const createBlog = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("blogs")
      .insert({
        user_id: session.user.id,
        title: title,
        content: content,
        inserted_at: date,
        thumbnail: coverphoto,
      })
      .single();

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
    }
  };
  const uploadToStorage = async (e) => {
    let { error: uploadError } = await supabase.storage
      .from("thumbnail")
      .upload("Thumbnail/" + coverphoto, file);
    if (uploadError) {
      console.log(uploadError);
    }
  };


  const loadBlogContent = async (e) => {
    let { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", params.id);

    if (error) {
      console.log(error);
    } else {
      setTitle(data[0].title);
      setContent(data[0].content);
      setCoverPhoto(data[0].thumbnail)
    }
  };

  const updateBlogContent = async (e) => {
    const { error } = await supabase
      .from("blogs")
      .update({
        user_id: session.user.id,
        title: title,
        content: content,
        inserted_at: date,
        thumbnail: coverphoto,
      })
      .match({ id: params.id });
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
    }
  };
    // const updateCurrentCoverImage = async (e) => {
    //   const { error } = await supabase.storage
    //     .from("thumbnail")
    //     .update(`Thumbnail/${coverphoto}`, file, {
    //       cacheControl: "3600",
    //       upsert: false,
    //     });
    //   if (error) {
    //     console.log(error);
    //   }
    // };

  useEffect(() => {
    if (params.id !== undefined) {
      loadBlogContent();
    }
  }, []);

  return (
    <div className="relative bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-7xl"></div>
      <div>
        <Notification message={message} />
        <div className="">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-gray-100 px-4 py-5 sm:p-6">
                <div>
                  <UploadCoverImage
                    setCoverPhoto={setCoverPhoto}
                    setFile={setFile}
                    preview={preview}
                    setPreview={setPreview}
                  />
                  <label
                    htmlFor="about"
                    className="mt-8 block text-sm font-medium text-blue-500"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      id="title"
                      name="title"
                      className="w-full border border-gray-300 mt-1 h-8 block rounded-md shadow-sm sm:text-sm "
                      required
                    />
                  </div>
                  <div className="mt-8 ">
                    <label
                      htmlFor="comment"
                      className="mt-5 lock text-sm font-medium text-blue-500"
                    >
                      Content
                    </label>

                    <JoditEditor
                      ref={editor}
                      value={content}
                      onChange={(newContent) => setContent(newContent)}
                    />
                  </div>
                </div>
              </div>
              {getString === "/createblog" ? (
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Post
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
