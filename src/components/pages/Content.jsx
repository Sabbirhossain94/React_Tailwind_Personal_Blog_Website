import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";

export default function Content({ session }) {
  const params = useParams();
  const [singleBlog, setSingleBlog] = useState([]);

  const showBlog = async (e) => {
    let { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", params.id);
    if (error) {
      console.log(error);
    } else {
      setSingleBlog(data);
    }
  };
  const deleteBlog = async (id) => {
    const { data, error } = await supabase
      .from("blogs")
      .delete()
      .match({ id: id });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };
  useEffect(() => {
    showBlog();
  }, []);
  return (
    <div>
      {singleBlog.map((item, key) => (
        <li key={key} className="list-none">
          <div key={item.id} className="overflow-hidden bg-white">
            <div className="relative mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-prose text-left lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
                <div className="flex mr-4">
                  <h3 className="mt-2 text-2xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                    {item.title}
                  </h3>
                  {session ? (
                    <div className="ml-[50px] flex flex-row">
                      <div className="relative cursor-pointer ml-2 top-[1.2rem]">
                        <Link to={`/blog/` + item.id + `/update`}>
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Update
                          </button>
                        </Link>
                      </div>
                      <div
                        onClick={() => deleteBlog(item.id)}
                        className="cursor-pointer relative ml-2 top-[1.2rem]"
                      >
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="relative lg:col-start-2 lg:row-start-1">
                  <svg
                    className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block"
                    width="404"
                    height="384"
                    fill="none"
                    viewBox="0 0 404 384"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="4"
                          height="4"
                          className="text-gray-200"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="404"
                      height="384"
                      fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                    />
                  </svg>
                </div>
                <div className="mt-8 lg:mt-0">
                  <div className="prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}
