import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeTime } from "./utilties/FormatDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function NotifictionsCard({ notifiction }) {
  const navigate = useNavigate();
  const query = useQueryClient();
  const { data, mutate, isPending, isSuccess } = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["feed"] });
      query.invalidateQueries({ queryKey: ["community"] });
      query.invalidateQueries({ queryKey: [`userPosts`] });
      query.invalidateQueries({ queryKey: [`notifictions`] });
      query.invalidateQueries({ queryKey: ["suggested"] });
      query.invalidateQueries({ queryKey: ["countNotifictions"] });
    },
  });
  function markAsRead() {
    return axios.patch(
      `https://route-posts.routemisr.com/notifications/${notifiction?._id}/read`,
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
      <article
        className={
          isSuccess
            ? "group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50"
            : "group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-[#dbeafe] bg-[#edf4ff]"
        }
      >
        <button
          onClick={() => {
            navigate(`/postdetails/${notifiction?.entityId}`);
          }}
          className="absolute cursor-pointer top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm leading-6 text-slate-800"
        >
          Show Post
        </button>
        <div className="relative shrink-0">
          <button
            type="button"
            className="block cursor-pointer"
            fdprocessedid="6pepia"
          >
            <img
              alt={notifiction?.actor?.name}
              className="h-11 w-11 rounded-full object-cover"
              src={notifiction?.actor?.photo}
            />
          </button>
          <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
            {notifiction?.type === "like_post" && (
              <i className="fa-regular fa-heart text-red-500"></i>
            )}
            {notifiction?.type === "comment_post" && (
              <i className="fa-regular fa-comment text-blue-500"></i>
            )}
            {notifiction?.type === "share_post" && (
              <i className="fa-solid fa-share text-green-500"></i>
            )}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
            <p className="text-sm leading-6 text-slate-800">
              <button
                type="button"
                className="font-bold hover:text-[#1877f2] hover:underline"
                fdprocessedid="x73vx"
              >
                {notifiction?.actor?.name}
              </button>{" "}
              {notifiction?.type === "like_post" && `Commented On Your Post`}
              {notifiction?.type === "comment_post" && `Liked Your Post`}
              {notifiction?.type === "share_post" && `Shared Your Post`}
            </p>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-semibold text-slate-500">
                {changeTime(notifiction?.createdAt)}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-dot text-[#1877f2]"
                aria-hidden="true"
              >
                <circle cx="12.1" cy="12.1" r={1} />
              </svg>
            </div>
          </div>
          <p className="mt-0.5 text-sm text-slate-600">
            {notifiction?.entity?.body}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => {
                mutate();
              }}
              className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-[#1877f2] ring-1 ring-[#dbeafe] transition hover:bg-[#e7f3ff]"
              fdprocessedid="8h7xfb"
            >
              {isPending ? (
                <span className="flex gap-2 items-center">
                  <i className="fa-solid fa-spin fa-spinner text-blue-500"></i>
                </span>
              ) : (
                <>
                  {isSuccess ? (
                    <span className="flex gap-2 items-center text-green-500">
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
                        className="lucide lucide-check"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>

                      <span>Read</span>
                    </span>
                  ) : (
                    <>
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
                        className="lucide lucide-check"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Mark as read</span>
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
