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
  console.log(array);
  return (
    <div>
      <nav className="relative bottom-0 left-0 right-0  w-full xs:mx-auto mx-auto h-32 flex flex-row items-center justify-center xs:flex xs:flex-wrap  px-2 sm:px-0  ">
        {array.map((page, key) => (
          <li
            key={key}
            className="h-32 flex items-center list-none px-2 py-2  "
          >
            <button
              className={
                page === currentPage
                  ? "border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500"
                  : "border border-gray-500 rounded-md hover:bg-blue-500"
              }
            >
              <p
                onClick={() => {
                  setCurrentPage(page);
                }}
                className="cursor-pointer bg-transparent  hover:text-white hover:inline-flex items-center px-4 py-3 text-sm font-medium "
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
