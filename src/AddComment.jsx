import { Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { authContext } from "./Context/AuthContext";

export default function AddComment({ postId }) {
  //id bta3 al post
  const { userData } = useContext(authContext); //data bta3ty ana
  const query = useQueryClient();

  const {
    data,
    isPending,
    isError,
    mutate: addCommentMutate,
  } = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      toast.success(data?.data?.data?.message);
      query.invalidateQueries({ queryKey: ["feed"] });
      query.invalidateQueries({ queryKey: ["community"] });
      query.invalidateQueries({ queryKey: [`userPosts`] });
      query.invalidateQueries({ queryKey: [`notifictions`] });
      query.invalidateQueries({ queryKey: ["comment", postId] });
      query.invalidateQueries({ queryKey: ["singlepost", postId] });
      query.invalidateQueries({ queryKey: ["suggested"] });
      query.invalidateQueries({ queryKey: ["countNotifictions"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
    onSettled: () => {
      reset();
    },
  });

  function addComment(obj) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  function handleComment(data) {
    const formData = new FormData();
    if (data.content) formData.append("content", data.content);
    if (data.image[0]) formData.append("image", data.image[0]);
    addCommentMutate(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleComment)} className="mt-3">
        <div className="flex items-start gap-2">
          <img
            alt={userData?.name}
            className="h-9 w-9 rounded-full object-cover"
            src={userData?.photo}
          />
          <div
            className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white"
            data-comment-mention-root="true"
          >
            <textarea
              placeholder={`Comment as ${userData?.name}...`}
              rows={1}
              className="max-h-35 min-h-10 w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
              defaultValue={""}
              required
              {...register("content")}
            />
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
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
                    className="lucide lucide-image"
                    aria-hidden="true"
                  >
                    <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                    <circle cx={9} cy={9} r={2} />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <input
                    className="hidden"
                    type="file"
                    {...register(`image`)}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
              >
                {isPending ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-send-horizontal"
                    aria-hidden="true"
                  >
                    <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"></path>
                    <path d="M6 12h16"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
