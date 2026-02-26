import { image } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "./Context/AuthContext";

export default function CreatePost() {
  const query = useQueryClient();

  const { userData } = useContext(authContext);
  const [imgPrevew, setImg] = useState(null);
  const fileInput = useRef(null);
  const bodyInput = useRef(null);

 
  function handleImg(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImg(url);
  }
  function closeImgPrevew() {
    setImg(null);
    fileInput.current.value = null;
  }

  const {
    data,
    isPending,
    isError,
    mutate: createPostMutate,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success(data.data.message);
      query.invalidateQueries({queryKey: ["posts"]});
      query.invalidateQueries({queryKey: [`userPosts`]});
      
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
    onSettled:()=>{
      fileInput.current.value =``
      bodyInput.current.value =``
      setImg(null)
    }
  });
console.log(`createdpost`,data);

  function createPost(obj) {
    return axios.post(`https://route-posts.routemisr.com/posts`, obj, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    });
  }

  function handleSubmit() {
    const formData = new FormData();
    if (fileInput.current.files[0]) {
      formData.append(`image`, fileInput.current.files[0]);
    }
    if (bodyInput.current.value) {
      formData.append(`body`, bodyInput.current.value);
    }
    createPostMutate(formData);
  }
    if (isError) return <h1>Some Error</h1>;

  return (
    <>
        <div className="my-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-start gap-3">
            <img
              alt={userData?.name}
              className="h-11 w-11 rounded-full object-cover"
              src={userData?.photo}
            />
            <div className="flex-1">
              <p className="text-base font-extrabold text-slate-900">
                {userData?.name}
              </p>
              <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-earth"
                  aria-hidden="true"
                >
                  <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                  <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                  <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                  <circle cx={12} cy={12} r={10} />
                </svg>
                <select className="bg-transparent outline-none">
                  <option value="public">Public</option>
                  <option value="following">Followers</option>
                  <option value="only_me">Only me</option>
                </select>
              </div>
            </div>
          </div>
          <textarea
            rows={2}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white  "
            spellCheck="false"
            placeholder={`What's on your mind, ${userData?.name}?`}
            type="text"
            ref={bodyInput}
          />

          {imgPrevew && (
            <div className="relative">
              <img
                src={imgPrevew}
                className="max-h-80 w-full rounded-lg object-cover"
                alt=""
              />
              <button
                onClick={closeImgPrevew}
                className="cursor-pointer absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white backdrop-blur-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
            <div className="relative flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-image text-emerald-600"
                  aria-hidden="true"
                >
                  <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                  <circle cx={9} cy={9} r={2} />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <span className="hidden sm:inline">Photo/video</span>
                <input
                  onChange={handleImg}
                  ref={fileInput}
                  className="hidden"
                  type="file"
                />
              </label>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-bold cursor-pointer text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
              >
                {isPending ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  `Post`
                )}
                {isPending ? (
                  ``
                ) : (
                  <i className="fa-regular fa-paper-plane "></i>
                )}
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
