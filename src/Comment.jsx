import { Button } from "@heroui/react";
import React, { useContext, useRef, useState } from "react";
import { changeDate, changeTime } from "./utilties/FormatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { authContext } from "./Context/AuthContext";
import { toast } from "react-toastify";


export default function Comment({ comment, postId }) {
  const query = useQueryClient();
  const { userData } = useContext(authContext);
  const [isOpen, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [Image, setImage] = useState(null);
  const updateContent = useRef(null);
  const updateImage = useRef(null);
  function openMenu() {
    setOpen(!isOpen);
  }

  const {
    data: dataUpdate,
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
  } = useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      query.invalidateQueries({ queryKey: ["feed"] });
        query.invalidateQueries({ queryKey: ["community"] });
        query.invalidateQueries({ queryKey: [`userPosts`] });
        query.invalidateQueries({ queryKey: [`notifictions`] });
        query.invalidateQueries({ queryKey: ["comment", postId] });
        query.invalidateQueries({ queryKey: ["singlepost", postId] });
        query.invalidateQueries({ queryKey: ["suggested"] });
        query.invalidateQueries({ queryKey: ["countNotifictions"] });
    },
    onSettled: () => {
      setEdit(false);
      setOpen(false);
    },
  });

  function updateComment(obj) {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${comment?._id}`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
  }

  function SaveComment() {
    const formData = new FormData();

    formData.append(`content`, updateContent.current.value || ``);
    if (updateImage.current.files[0])
      formData.append(`image`, updateImage.current.files[0]);
    mutateUpdate(formData);
  }

  const { data, mutate, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      query.invalidateQueries({ queryKey: ["posts"] });
      query.invalidateQueries({ queryKey: [`userPosts`] });
      query.invalidateQueries({ queryKey: ["singlepost", postId] });
      query.invalidateQueries({ queryKey: ["comment", postId] });
    },
    onSettled: () => {
      setOpen(false);
    },
  });
  function deleteComment() {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${comment?._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  const STATIC_IMAGE = `https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_user_personalization&w=740&q=80`;
  return (
    <>
      <div className="relative flex items-start my-3 gap-2">
        <img
          onError={(e) => (e.target.src = STATIC_IMAGE)}
          alt={comment?.commentCreator?.name}
          className="mt-0.5 h-8 w-8 rounded-full object-cover"
          src={comment?.commentCreator?.photo}
        />
        <div className="min-w-0 flex-1">
          <div className="relative inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-3 py-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {comment?.commentCreator?.name}
                </p>
                <p className="text-xs text-slate-500">
                  @{comment?.commentCreator?.username} ·{" "}
                  {changeTime(comment?.createdAt)}
                </p>
              </div>
            </div>
            {isEdit ? (
              <div className="">
                <div className="my-2 flex items-center gap-2">
                  <input
                    type="text"
                    ref={updateContent}
                    className="w-full rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm"
                    defaultValue={comment?.content}
                  />

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
                        <rect
                          width={18}
                          height={18}
                          x={3}
                          y={3}
                          rx={2}
                          ry={2}
                        />
                        <circle cx={9} cy={9} r={2} />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                      <input
                        onChange={handleImage}
                        ref={updateImage}
                        className="hidden"
                        type="file"
                      />
                    </label>
                  </div>

                  <button
                    onClick={SaveComment}
                    className="rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#166fe5] disabled:opacity-60"
                  >
                    {isPendingUpdate ? (
                      <i className="fa-solid fa-spin fa-spinner text-white"></i>
                    ) : (
                      `Save`
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEdit(false);
                      setOpen(false);
                      setImage(null);
                    }}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>
                {Image ? (
                  <img
                    src={Image}
                    alt=""
                    className="w-full max-h-80 object-cover mt-2"
                  />
                ) : (
                  comment?.image && (
                    <img
                      src={comment?.image}
                      alt=""
                      className="w-full max-h-80 object-cover mt-2"
                    />
                  )
                )}
              </div>
            ) : (
              <>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
                  {comment?.content}
                </p>
                {Image ? (
                  <img
                    src={Image}
                    alt=""
                    className="w-full max-h-80 object-cover"
                  />
                ) : (
                  comment?.image && (
                    <img
                      src={comment?.image}
                      alt=""
                      className="w-full max-h-80 object-cover"
                    />
                  )
                )}
              </>
            )}
          </div>
          <div className="mt-1.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-400">
                {changeTime(comment?.createdAt)}
              </span>
              <button
                className="text-xs font-semibold hover:underline disabled:opacity-60 text-slate-500"
                fdprocessedid="gr7ai"
              >
                Like ({comment?.likes?.length})
              </button>
              <button
                className="text-xs font-semibold transition hover:underline disabled:opacity-60 text-slate-500 hover:text-[#1877f2]"
                fdprocessedid="5dznpu"
              >
                Reply
              </button>
            </div>
            {comment?.commentCreator?._id === userData?._id && (
              <div className="relative" data-comment-menu-root="true">
                <button
                  onClick={openMenu}
                  className="cursor-pointer rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
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
                    className="lucide lucide-ellipsis"
                    aria-hidden="true"
                  >
                    <circle cx={12} cy={12} r={1} />
                    <circle cx={19} cy={12} r={1} />
                    <circle cx={5} cy={12} r={1} />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute right-0   shadow-lg">
                    <Button
                      onClick={() => {
                        setOpen(false);
                        setEdit(true);
                      }}
                      color="primary"
                      className="size-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={15}
                        height={15}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-pencil"
                        aria-hidden="true"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </Button>
                    <Button onClick={mutate} color="danger" className="size-5">
                      {isPending ? (
                        <i className="fa-solid fa-spin fa-spinner text-white"></i>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={15}
                          height={15}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash2 lucide-trash-2"
                          aria-hidden="true"
                        >
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      ;
    </>
  );
}
