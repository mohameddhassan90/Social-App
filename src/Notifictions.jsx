import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import NotifictionsCard from "./NotifictionsCard";

export default function Notifictions() {
  const query = useQueryClient();
  const { data } = useQuery({
    queryKey: [`notifictions`],
    queryFn: getNotifictions,
  });
  function getNotifictions() {
    return axios.get(
      `https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  const {
    data: markAllRead,
    isPending,
    mutate: mutateMarkAll,
  } = useMutation({
    mutationFn: markAll,
    onSuccess: () => {
        query.invalidateQueries({ queryKey: [`notifictions`] });
        query.invalidateQueries({ queryKey: ["countNotifictions"] });
    },
  });
  function markAll() {
    return axios.patch(
      `https://route-posts.routemisr.com/notifications/read-all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  const { data: count, isLoading } = useQuery({
    queryKey: [`countNotifictions`],
    queryFn: getCount,
  });
  function getCount() {
    return axios.get(
      `https://route-posts.routemisr.com/notifications/unread-count`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-3.5">
      <main className="min-w-0">
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Notifications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Realtime updates for likes, comments, shares, and follows.
                </p>
              </div>
              <button
                onClick={() => {
                  mutateMarkAll();
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                fdprocessedid="jzzz7"
              >
                {!isPending&&<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-check"
                  aria-hidden="true"
                >
                  <path d="M18 6 7 17l-5-5" />
                  <path d="m22 10-7.5 7.5L13 16" />
                </svg>}
                {isPending?<i className="fa-solid fa-spin fa-spinner text-blue-500"></i>:`Mark all as read`}
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:items-center">
              <button
                type="button"
                className="rounded-full px-4 py-1.5 text-sm font-bold transition bg-[#1877f2] text-white"
                fdprocessedid="uhgxc"
              >
                All
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition bg-slate-100 text-slate-700 hover:bg-slate-200"
                fdprocessedid="pynv2"
              >
                Unread
                <span className="rounded-full px-2 py-0.5 text-xs bg-white text-[#1877f2]">
                  {count?.data?.data?.unreadCount}
                </span>
              </button>
            </div>
          </div>
          <div className="space-y-2 p-3 sm:p-4">
            {data?.data?.data?.notifications.map((notifiction) => (
              <NotifictionsCard notifiction={notifiction}></NotifictionsCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
