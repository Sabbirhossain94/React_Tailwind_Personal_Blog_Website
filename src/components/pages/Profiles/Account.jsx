import React from "react";
import supabase from "../../../services/supabaseClient";
import { useState, useEffect } from "react";
import { avatarFIle } from "../../../services/getAvatar";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatar, setAvatar] = useState(null);
  // const [preview, setPreview] = useState(null);
  const date = new Date().toLocaleString();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const getAvatarUrl = async () => {
      const url = await avatarFIle();
      if (url) {
        setAvatar(url);
      }
    }
    getAvatarUrl()
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { user } = session;

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userId = session.user.id;

      let { error } = await supabase
        .from("profiles")
        .update({
          username: username,
          avatar_url: avatarUrl,
          updated_at: date,
        })
        .match({ id: userId });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      alert();
      setLoading(false);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload("Profile Photo/" + filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      setAvatarUrl(filePath);
      // downloadImage(filePath);
    } catch (error) {
      alert(error.message);
    }
  };

  // const downloadImage = async (path) => {
  //   try {
  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .download(`Profile Photo/${path}`);
  //     if (error) {
  //       throw error;
  //     }
  //     const url = URL.createObjectURL(data);
  //     setPreview(url);
  //   } catch (error) {
  //     console.log("Error downloading image: ", error.message);
  //   }
  // };

  return (
    <div>
      {session ? (
        <div className="mx-auto mt-[50px] max-w-md flex justify-center flex-col border p-8 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <form onSubmit={updateProfile}>
            <div className="flex items-center gap-8">
              <div className="w-1/2">
                <img
                  src={avatar}
                  alt={"No image"}
                  className="focus:ring-offset-2 ring-2 dark:ring-teal-500 rounded-full object-cover"
                  style={{ height: 150, width: 150 }}
                />
              </div>
              <div className="w-1/2 h-full">
                <label for="uploadPic"
                  className="h-10 cursor-pointer border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-10 whitespace-nowrap w-full py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                  Change Picture
                  <input type="file" id='uploadPic' className="hidden" />
                </label>
                {/* <div className="">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    value={""}
                    onChange={uploadAvatar}
                    className=" text-blue-400"
                  />
                </div> */}
              </div>
            </div>
            <div className="mt-8">
              <label htmlFor="email" className="dark:text-gray-300">Email</label>
              <div className="form-control mt-2 block w-full px-3 py-1.5 text-base font-normal text-gray-500 bg-gray-100 dark:bg-zinc-800 bg-clip-padding border border-solid border-zinc-300 dark:border-zinc-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                {session.user.email}
              </div>
              <div className="mt-4">
                <label htmlFor="username" className="dark:text-gray-300">Name</label>
                <input
                  className="form-control mt-2 block w-full px-3 py-1.5 text-base font-normal dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 bg-clip-padding border border-solid border-zinc-300 dark:border-zinc-700 rounded transition ease-in-out m-0 focus:border focus:border-zinc-700"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="h-10 cursor-pointer border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-10 whitespace-nowrap w-full py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Account;
