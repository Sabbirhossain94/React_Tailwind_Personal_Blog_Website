import React from "react";

export default function Pagination({
  currentPage,
  itemsPerPage,
  totalLength,
  setCurrentPage,
}) {
  let array = [];
  for (let i = 1; i <= Math.ceil(totalLength / itemsPerPage); i++) {
    array.push(i);
  }
  return (
    <div>
      <nav className="dark:bg-zinc-900 relative bottom-0 left-0 right-0  w-full xs:mx-auto mx-auto h-32 flex flex-row items-center justify-center xs:flex xs:flex-wrap  px-2 sm:px-0  ">
        {array.map((page, key) => (
          <li
            key={key}
            className="h-32 flex items-center list-none px-2 py-2  "
          >
            <button
              className={
                page === currentPage
                  ? "border border-blue-500 text-blue-500 dark:border-teal-500 rounded-md dark:text-teal-500 hover:border-blue-500 hover:text-blue-500 dark:hover:border-teal-500 px-0.5"
                  : "border border-gray-300 dark:border-gray-700 dark:hover:text-teal-500 dark:hover:border-teal-500 text-gray-300 rounded-md hover:border-blue-500 px-0.5"
              }
            >
              <p
                onClick={() => {
                  setCurrentPage(page);
                }}
                className={`cursor-pointer bg-transparent dark:text-gray-500  hover:inline-flex items-center px-4 py-3 text-sm font-medium ${page === currentPage ? "dark:text-teal-500 dark:hover:text-teal-500": ""}`}
              >
                {page}
              </p>
            </button>
          </li>
        ))}
      </nav>
    </div>
  );
}
