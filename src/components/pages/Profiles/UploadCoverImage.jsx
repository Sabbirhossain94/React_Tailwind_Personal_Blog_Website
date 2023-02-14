import React from "react";

function UploadCoverImage({ setFile, setCoverPhoto, preview, setPreview }) {
  const handleCoverImage = async (e) => {
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${Math.random()}.${fileExt}`;
    setFile(file);
    setCoverPhoto(filePath);
    const blob = URL.createObjectURL(file);
    setPreview(blob);
  };

  return (
    <div>
      {preview ? (
        <div>
          <img
            src={preview}
            width="200px"
            height="200px"
            className="border border-blue-400"
            alt="error"
          />
          <button
            onClick={() => setPreview(null)}
            className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center rounded-md border border-transparent border-blue-500 bg-white px-4 py-2 text-sm font-medium text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      ) : (
        <label className="h-8 mt-4 cursor-pointer overflow-hidden inline-flex items-center justify-center rounded-md border border-transparent border-blue-500 hover:border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
          <input
            type="file"
            name="image"
            accept="image/*"
            value={""}
            onChange={(e) => handleCoverImage(e)}
            className="hidden"
          />
          Cover Image
        </label>
      )}
    </div>
  );
}

export default UploadCoverImage;
