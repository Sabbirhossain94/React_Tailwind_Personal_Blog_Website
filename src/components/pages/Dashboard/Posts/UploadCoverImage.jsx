import { useEffect, useState } from "react";
import { ImagePlaceholder } from "../../../layout/skeleton/Skeleton";

function UploadCoverImage({ isCreate, blog, setFile, loading }) {
  const [preview, setPreview] = useState(null);
  const [showCancel, setShowCancel] = useState(false);

  const handleFileChange = (e) => {
    if (!isCreate) {
      setShowCancel(true);
    }
    const file = e.target.files[0];
    const viewImage = URL.createObjectURL(file);
    setFile(file)
    setPreview(viewImage)
  };

  useEffect(() => {
    if (showCancel === false) {
      setPreview(blog && blog.coverphoto && blog.coverphoto.publicUrl);
    }
  }, [showCancel]);

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
            className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      ) : (
        <label htmlFor="file" className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
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
          {loading ? <ImagePlaceholder /> :
            <img
              src={preview ? preview : blog?.coverphoto}
              width="300px"
              height="300px"
              className="border border-blue-400"
              alt="error"
            />}
          <div className="space-x-4">
            {showCancel && <button
              type="button"
              onClick={() => {
                setShowCancel(false);
              }}
              className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Reset
            </button>
            }
            <label htmlFor="file" className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
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
