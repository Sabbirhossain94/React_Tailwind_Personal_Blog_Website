import React from "react";
import supabase from "../../../supabaseClient";
import { useState, useEffect } from "react";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    getProfile();
  }, []);

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
      setUploading(true);

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
      downloadImage(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(`Profile Photo/${path}`);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };
  return (
    <div>
      {session ? (
        <div className="mx-auto mt-[50px] w-1/2 flex justify-center flex-col">
          {loading ? (
            "Saving ..."
          ) : (
            <form onSubmit={updateProfile}>
              <div className="" style={{ width: 250 }} aria-live="polite">
                <img
                  src={
                    avatarUrl ? avatarUrl : `https://i.imgur.com/W2AT377.jpg`
                  }
                  alt={avatarUrl ? "Avatar" : "No image"}
                  className="avatar image ring-1 rounded-md"
                  style={{ height: 200, width: 200 }}
                />
                {uploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <label className="mt-[15px] text-center" htmlFor="single">
                      Upload an avatar
                    </label>
                    <div className="">
                      <input
                        type="file"
                        id="single"
                        accept="image/*"
                        value={""}
                        onChange={uploadAvatar}
                        disabled={uploading}
                        className=" text-blue-400"
                      />
                    </div>
                  </>
                )}
              </div>
              <label htmlFor="email">Email</label>
              <div className='"form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'>
                {session.user.email}
              </div>
              <div>
                <label htmlFor="username">Name</label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Account;
