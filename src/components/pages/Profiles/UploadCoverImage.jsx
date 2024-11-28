import { useState } from "react";

function UploadCoverImage({ isCreate, blog, setBlog, setFile }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const viewImage = URL.createObjectURL(file);
    const fileExt = file.name.split(".").pop();
    const filePath = `${Math.random()}.${fileExt}`;
    setFile(file)
    setPreview(viewImage)
    setBlog((prevData) => ({
      ...prevData,
      coverphoto: filePath,
    }));
  };

  console.log(preview)

  return (
    <div>
      {isCreate ? preview ? (
        <div>
          <img
            src={preview}
            width="300px"
            height="300px"
            alt="thumbnail"
          />
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      ) : (
        <label htmlFor="file" className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          Upload Blog Thumbnail
        </label>
      ) :
        <div>
          <img
            src={preview ? preview : blog?.coverphoto?.publicUrl}
            width="300px"
            height="300px"
            className="border border-blue-400"
            alt="error"
          />
          <div className="space-x-4">
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Cancel
            </button>
            <label htmlFor="file" className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              Change Blog Thumbnail
            </label>
          </div>
        </div>
      }
    </div>
  );
}

export default UploadCoverImage;
