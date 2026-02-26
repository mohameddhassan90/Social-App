import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import { changeDate } from "./utilties/FormatDate";
import Comment from "./Comment";
import { NavLink } from "react-router-dom";
import AddComment from "./AddComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { authContext } from "./Context/AuthContext";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import Loading from "./Loading";
import { PropagateLoader } from "react-spinners";

export default function PostCard({ post, isHome }) {
  const query = useQueryClient();
  const { userData } = useContext(authContext);
  const [isOpen, setOpen] = useState(false);
  function toggleMenu() {
    setOpen(!isOpen);
  }

  const { data,isLoading,isError } = useQuery({
    queryKey: ["comment", post?._id], //id bta3 al post
    queryFn: getPostComment,
  });
  console.log(`post`, post);
  console.log(`comments`, data);

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
      query.invalidateQueries({ queryKey: ["posts"] });
      query.invalidateQueries({ queryKey: [`userPosts`] });
      query.invalidateQueries({ queryKey: ["singlepost", post?._id] });
      query.invalidateQueries({ queryKey: ["comment", post?._id] });
    },
  });
  console.log(`dataLike`, dataLike);

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
                  {changeDate(post?.createdAt)}
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
                      <UpdateModal post={post} postId={post?._id}></UpdateModal>
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
              <span>{post?.commentsCount} comments</span>
              <NavLink
                to={`/postdetails/${post?._id}`}
                className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
              >
                View details
              </NavLink>
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
            <span>Comment</span>
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
        <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <AddComment postId={post?._id}></AddComment>

          {isLoading?<PropagateLoader className="h-15 text-center content-center w-full"></PropagateLoader>:isHome && firstComment && <Comment comment={firstComment}></Comment>}

          {!isHome &&
            data?.data?.data?.comments.map((comment) => (
              <Comment key={comment._id} comment={comment}></Comment>
            ))}
        </div>
      </article>
    </>
  );
}
