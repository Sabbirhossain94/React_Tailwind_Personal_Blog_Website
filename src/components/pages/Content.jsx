import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import AnimatedPage from "../../Sub-components/SlideAnimation";
import Footer from "../Footer";
import moment from "moment/moment";
import Modal from "../../Sub-components/Modal";
export default function Content({ session }) {
  const params = useParams();
  const [singleBlog, setSingleBlog] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const blogCoverUrl = process.env.REACT_APP_STORAGE_PUBLIC_URL;
  var months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const showBlog = async () => {
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
      navigate("/");
    }
  };
  useEffect(() => {
    showBlog();
  }, []);
  const handleModal = () => {
    setOpenModal(true);
  };
  return (
    <div>
      <div className="min-h-screen relative">
        <AnimatedPage>
          <div>
            {singleBlog.map((item, key) => (
              <li key={key} className="list-none">
                <div key={item.id} className="overflow-hidden bg-white">
                  <div className="relative mx-auto max-w-full py-16 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-prose lg:grid lg:max-w-full lg:grid-cols-1 lg:gap-8">
                      <div className="flex mr-4">
                        <div className="flex flex-col justify-center mx-auto">
                          <div className=" relative flex w-full">
                            <h3 className="text-xl font-semibold w-full">
                              <span className="text-gray-500">
                                Published on
                              </span>{" "}
                              <span className="text-blue-600">
                                {item.inserted_at}
                              </span>
                            </h3>
                            {session ? (
                              <div className=" w-full flex flex-row justify-end">
                                <div className=" cursor-pointer ml-2 top-[1.2rem]">
                                  <Link to={`/blog/` + item.id + `/update`}>
                                    <button
                                      type="submit"
                                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                      Update
                                    </button>
                                  </Link>
                                </div>{" "}
                                <div className="cursor-pointer  ml-2 top-[1.2rem]">
                                  <button
                                    onClick={handleModal}
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
                          <img
                            src={blogCoverUrl + item.thumbnail}
                            className="mt-4"
                          />
                          {openModal ? (
                            <div>
                              {" "}
                              <Modal deleteBlog={deleteBlog} itemId={item.id} openModal={openModal} setOpenModal={setOpenModal}/>{" "}
                            </div>
                          ) : (
                            ""
                          )}
                         
                          {/* <h3 className="mt-8 text-center text-2xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                            {item.title}
                          </h3> */}
                        </div>
                      </div>
                    </div>
                    <div className="mt-32 lg:grid lg:grid-cols-1 lg:max-w-7xl lg:mx-auto lg:gap-8">
                      <div className="mt-8 lg:mt-0">
                        <div className="prose prose-indigo mx-auto mt-5 text-center text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
                          <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </AnimatedPage>
      </div>
      <Footer />
    </div>
  );
}
