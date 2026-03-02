import { changeTime } from "./utilties/FormatDate";
import Comment from "./Comment";
import { Link, NavLink } from "react-router-dom";
import AddComment from "./AddComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { authContext } from "./Context/AuthContext";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import Loading from "./Loading";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function PostCard({ post, isHome }) {
  const query = useQueryClient();
  const { userData } = useContext(authContext);
  const [isOpen, setOpen] = useState(false);
  function toggleMenu() {
    setOpen(!isOpen);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comment", post?._id], //id bta3 al post
    queryFn: getPostComment,
  });

  const firstComment = data?.data?.data?.comments[0];

  function getPostComment() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${post?._id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const {
    data: dataLike,
    isPending,
    mutate: mutateLike,
  } = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["feed"] });
      query.invalidateQueries({ queryKey: ["community"] });
      query.invalidateQueries({ queryKey: [`userPosts`] });
      query.invalidateQueries({ queryKey: [`notifictions`] });
      query.invalidateQueries({ queryKey: ["comment", post?._id] });
      query.invalidateQueries({ queryKey: ["singlepost", post?._id] });
      query.invalidateQueries({ queryKey: ["suggested"] });
      query.invalidateQueries({ queryKey: ["countNotifictions"] });
    },
  });

  function handleLike() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${post?._id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  const [isShare, setShare] = useState(false);
  const ShareContent = useRef(null);
  function toggleShare() {
    setShare(!isShare);
  }

  const {
    data: shareData,
    isPending: sharePending,
    mutate: shareResponse,
  } = useMutation({
    mutationFn: sharePost,
    onSuccess: () => {
      toast.success(`Post Shared Successfully`);
      query.invalidateQueries({ queryKey: ["feed"] });
      query.invalidateQueries({ queryKey: ["community"] });
      query.invalidateQueries({ queryKey: [`userPosts`] });
      query.invalidateQueries({ queryKey: [`notifictions`] });
      query.invalidateQueries({ queryKey: ["comment", post?._id] });
      query.invalidateQueries({ queryKey: ["singlepost", post?._id] });
      query.invalidateQueries({ queryKey: ["suggested"] });
      query.invalidateQueries({ queryKey: ["countNotifictions"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
    onSettled: () => {
      setShare(false);
    },
  });
  function sharePost(obj) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${post?._id}/share`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }
  function handleShare() {
    const obj = { body: ShareContent?.current?.value || `  ` };
    shareResponse(obj);
  }

  return (
    <>
      <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm ">
        <div className="p-4">
          <div className="flex items-center gap-3">
            {/*need herf */}{" "}
            <a className="shrink-0" href="" data-discover="true">
              <img
                alt={post?.user?.name}
                className="h-11 w-11 rounded-full object-cover"
                src={post?.user?.photo}
              />
            </a>
            <div className="min-w-0 flex-1">
              <a
                className="truncate text-sm font-bold text-foreground hover:underline"
                href="#/profile"
                data-discover="true"
              >
                {post?.user?.name}
              </a>
              <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                @{post?.user?.username} ·{" "}
                <button
                  type="button"
                  className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
                >
                  {changeTime(post?.createdAt)}
                </button>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="cursor-pointer rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
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
                  className="lucide lucide-ellipsis"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={19} cy={12} r={1} />
                  <circle cx={5} cy={12} r={1} />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                  <button className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
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
                      className="lucide lucide-bookmark"
                      aria-hidden="true"
                    >
                      <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
                    </svg>
                    Save post
                  </button>
                  {userData?.id === post?.user?._id && (
                    <>
                      <UpdateModal
                        post={post}
                        setOpen={setOpen}
                        postId={post?._id}
                      ></UpdateModal>
                      <DeleteModal post={post}></DeleteModal>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="mt-3">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {post?.body}
            </p>
          </div>
        </div>
        <div className="max-h-155 overflow-hidden border-y border-slate-200">
          <button
            type="button"
            className="group relative block w-full cursor-pointer"
          >
            {post?.image && (
              <img
                alt="post"
                className="w-full object-cover"
                src={post?.image}
              />
            )}
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          </button>
        </div>
        {/* if Shared Post  */}
        {post?.isShare && (
          <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="mx-4 my-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <div className="p-3">
                <div className="mb-2 flex items-center gap-2">
                  <img
                    alt={post?.sharedPost?.user?.name}
                    className="h-9 w-9 rounded-full object-cover"
                    src={post?.sharedPost?.user?.photo}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {post?.sharedPost?.user?.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      @{post?.sharedPost?.user?.username}
                    </p>
                  </div>
                  
                  <Link
                to={`/postdetails/${post?.sharedPost?._id}`}
                className="ml-auto rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
              >
                Original Post
              </Link>
                </div>
                <p className="truncate text-black ml-10">
                  {post?.sharedPost?.body
                    ? post?.sharedPost?.body
                    : `Shared post content unavailable`}
                </p>
              </div>
              <div className="border-t border-slate-200">
                {post?.sharedPost?.image && (
                  <img
                    alt="Shared Post"
                    className="max-h-150 w-full object-cover"
                    src={post?.sharedPost?.image}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
              <span>
                <i className="fa-regular fa-thumbs-up"></i>{" "}
                {post?.sharedPost?.likesCount}
              </span>
              <span>
                <i className="fa-regular fa-comment"></i>{" "}
                {post?.sharedPost?.commentsCount}
              </span>
              <span>
                <i className="fa-solid fa-share-nodes"></i>{" "}
                {post?.sharedPost?.sharesCount}
              </span>
            </div>
          </div>
        )}
        {/* ............... */}
        <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
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
                  className="lucide lucide-thumbs-up"
                  aria-hidden="true"
                >
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                  <path d="M7 10v12" />
                </svg>
              </span>
              <button
                type="button"
                className="font-semibold transition cursor-default"
              >
                {post?.likesCount} likes
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
              <span className="inline-flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-repeat2 lucide-repeat-2"
                  aria-hidden="true"
                >
                  <path d="m2 9 3-3 3 3" />
                  <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                  <path d="m22 15-3 3-3-3" />
                  <path d="M11 6h6a2 2 0 0 1 2 2v10" />
                </svg>
                {post?.sharesCount} shares
              </span>
              <Link to={`/postdetails/${post?._id}`}>
                {post?.commentsCount} comments
              </Link>
              <Link
                to={`/postdetails/${post?._id}`}
                className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-4 border-t border-slate-200" />
        <div className="grid grid-cols-3 gap-1 p-1">
          <button
            onClick={mutateLike}
            className={
              dataLike?.data?.data?.liked
                ? "cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-blue-500 hover:bg-blue-200"
                : "cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
            }
          >
            {isPending ? (
              ``
            ) : (
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
                className="lucide lucide-thumbs-up"
                aria-hidden="true"
              >
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                <path d="M7 10v12" />
              </svg>
            )}
            {dataLike?.data?.data?.liked ? (
              <span>
                {isPending ? (
                  <i className="fa-solid fa-spin fa-spinner text-blue-500"></i>
                ) : (
                  `Liked`
                )}
              </span>
            ) : (
              <span>
                {isPending ? (
                  <i className="fa-solid fa-spin fa-spinner text-blue-500"></i>
                ) : (
                  `Like`
                )}
              </span>
            )}
          </button>
          <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
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
              className="lucide lucide-message-circle"
              aria-hidden="true"
            >
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
            </svg>
            <Link to={`/postdetails/${post?._id}`}>
            
              {post?.commentsCount >= 1 && post?.commentsCount} comments
            </Link>
          </button>
          <button
            onClick={toggleShare}
            className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
          >
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
              className="lucide lucide-share2 lucide-share-2"
              aria-hidden="true"
            >
              <circle cx={18} cy={5} r={3} />
              <circle cx={6} cy={12} r={3} />
              <circle cx={18} cy={19} r={3} />
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
            <span>Share</span>
          </button>
        </div>
        {isShare && (
          <div
            onClick={() => setShare(false)}
            className="fixed inset-0 z-70 flex items-center justify-center bg-slate-900/65 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-140 rounded-2xl border border-slate-200 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h4 className="text-base font-extrabold text-slate-900">
                  Share post
                </h4>
                <button
                  onClick={() => {
                    setShare(false);
                  }}
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-60"
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
              <div className="space-y-3 p-4">
                <textarea
                  placeholder="Say something about this..."
                  rows={3}
                  maxLength={500}
                  ref={ShareContent}
                  className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2]/20"
                  defaultValue={""}
                />
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center gap-2">
                    <img
                      alt={post?.user?.name}
                      className="h-8 w-8 rounded-full object-cover"
                      src={post?.user?.photo}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {post?.user?.name}
                      </p>
                      <p className="truncate text-xs font-semibold text-slate-500">
                        @{post?.user?.username}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">
                    {post?.body}
                  </p>
                  {post?.image && (
                    <img
                      alt="post preview"
                      className="mt-2 max-h-55 w-full rounded-lg object-cover"
                      src={post?.image}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
                <button
                  onClick={() => {
                    setShare(false);
                  }}
                  type="button"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShare}
                  type="button"
                  className="inline-flex items-center rounded-lg bg-[#1877f2] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sharePending ? (
                    <i className="fa-solid fa-spin fa-spinner text-white"></i>
                  ) : (
                    `Share now`
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <AddComment postId={post?._id}></AddComment>

          {isLoading ? (
            <PropagateLoader className="h-15 text-center content-center w-full"></PropagateLoader>
          ) : (
            isHome &&
            firstComment && (
              <Comment postId={post?._id} comment={firstComment}></Comment>
            )
          )}

          {!isHome &&
            data?.data?.data?.comments.map((comment) => (
              <Comment
                postId={post?._id}
                key={comment._id}
                comment={comment}
              ></Comment>
            ))}
        </div>
      </article>
    </>
  );
}
