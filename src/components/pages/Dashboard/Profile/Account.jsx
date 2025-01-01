import { useState } from "react";
import { ProfileImagePlaceholder } from "../../../layout/skeleton/Skeleton";
import { useProfile } from "../../../../context/ProfileContext";
import { updateProfile } from "../../../../services/profile/updateProfile";
import { passwordUpdate } from "../../../../services/auth/updatePassword";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import Spinner from "../../../animation/Spinner"

const Account = () => {
  const { session, profile, setProfile, loading } = useProfile()
  const [preview, setPreview] = useState(null);
  const [password, setPassword] = useState('');
  const [showVisibility, setShowVisibility] = useState(false)
  const [file, setFile] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false);

  const uploadAvatar = (e) => {
    const file = e.target.files[0];
    const viewImage = URL.createObjectURL(file);
    setPreview(viewImage)
    setFile(file)
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdateLoading(true)
    updateProfile(session, profile, file, setUpdateLoading);
    if (password) {
      passwordUpdate(password)
    }
  }

  return (
    <div>
      <div className="mx-auto mt-[50px] w-full md:max-w-md flex justify-center flex-col border p-8 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <form
          onSubmit={handleUpdate}
        >
          <div className="flex flex-col sm:flex-row items-center">
            <div className="sm:w-1/2">
              {!profile.avatarUrl && !preview ? <AiOutlineUser className="w-[150px] h-[150px] dark:text-gray-400 border-2 border-zinc-300 dark:border-zinc-700 rounded-full" /> :
                loading ? <ProfileImagePlaceholder /> : <img
                  src={preview ? preview : profile.avatarUrl}
                  alt="avatar"
                  className="focus:ring-offset-2 w-[200px] h-[200px] md:w-[150px] md:h-[150px] ring-2 dark:ring-teal-500 rounded-full object-fit"
                />
              }
            </div>
            <div className="w-full sm:w-1/2 h-full flex justify-center">
              <label htmlFor="uploadPic"
                className="h-10 cursor-pointer border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 text-center whitespace-nowrap w-full py-2 text-sm font-medium text-blue-500 dark:text-teal-500 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500">
                Change Picture
                <input
                  id='uploadPic'
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="email" className="dark:text-gray-300">Email</label>
            <div className="form-control mt-2 block w-full px-3 py-1.5 text-base font-normal text-gray-500 bg-gray-100 dark:bg-zinc-800 bg-clip-padding border border-solid border-zinc-300 dark:border-zinc-700 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
              {session.user.email}
            </div>
            <div className="mt-6">
              <label htmlFor="username" className="dark:text-gray-300">Name</label>
              <input
                className="form-control mt-2 block w-full px-3 py-1.5 text-base font-normal dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 bg-clip-padding border border-solid border-zinc-300 dark:border-zinc-700 transition ease-in-out m-0 focus:border focus:border-zinc-700"
                name="username"
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              />
            </div>
            <div className="mt-6 relative">
              <label htmlFor="password" className="dark:text-gray-300">Password (Optional)</label>
              <input
                className="form-control mt-2 block w-full px-3 py-1.5 text-base font-normal dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 bg-clip-padding border border-solid border-zinc-300 dark:border-zinc-700 transition ease-in-out m-0 focus:border focus:border-zinc-700"
                name="password"
                type={showVisibility ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showVisibility ?
                <MdVisibility onClick={() => setShowVisibility(!showVisibility)} className="cursor-pointer text-gray-500 absolute right-2 top-11" /> :
                <MdVisibilityOff onClick={() => setShowVisibility(!showVisibility)} className="cursor-pointer text-gray-500 absolute right-2 top-11" />
              }
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="h-10 flex gap-2 items-center cursor-pointer border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-10 whitespace-nowrap w-full py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 sm:w-auto"
              >
                {updateLoading ? <><Spinner />Processing...</> : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
