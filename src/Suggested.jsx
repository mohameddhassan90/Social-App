import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import SuggestedCard from "./SuggestedCard";
import Loading from "./Loading";

export default function Suggested() {
  const { data, isLoading } = useQuery({
    queryKey: [`suggested`],
    queryFn: getSuggested,
  });
  function getSuggested() {
    return axios.get(
      `https://route-posts.routemisr.com/users/suggestions?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }
  const [isOpen, setOpen] = useState(false);
  function ShowSuggest() {
    setOpen(!isOpen);
  }

  return (
    <>
      <aside
        side
        className="order-1 xl:order-0 h-fit xl:sticky xl:top-21 xl:block"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
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
                className="lucide lucide-users text-[#1877f2]"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx={9} cy={7} r={4} />
              </svg>
              <h3 className="text-base font-extrabold text-slate-900">
                Suggested Friends
              </h3>
            </div>
            <span className="rounded-full flex gap-5 bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
              <span className="text-xs font-bold text-black">
                {data?.data?.data?.suggestions?.length}
              </span>
              <span
                onClick={ShowSuggest}
                className="xl:hidden text-xs font-bold cursor-pointer text-[#1877f2]"
              >
                Show
              </span>
            </span>
          </div>
          <div className="hidden xl:block">
            <div className="mb-3">
              <label className="relative block">
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
                  className="lucide lucide-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                >
                  <path d="m21 21-4.34-4.34" />
                  <circle cx={11} cy={11} r={8} />
                </svg>
                <input
                  placeholder="Search friends..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
                  defaultValue
                  fdprocessedid="ng02bi"
                />
              </label>
            </div>
            <div className="space-y-3">
              {isLoading ? (
                <Loading></Loading>
              ) : (
                <>
                  {data?.data?.data?.suggestions.map((suggest) => (
                    <SuggestedCard
                      key={suggest?._id}
                      suggest={suggest}
                    ></SuggestedCard>
                  ))}
                </>
              )}
            </div>
            <button
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              fdprocessedid="0w5mluj"
            >
              View more
            </button>
          </div>
          {isOpen && (
            <>
              {" "}
              <div className="mb-3">
                <label className="relative block">
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
                    className="lucide lucide-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  >
                    <path d="m21 21-4.34-4.34" />
                    <circle cx={11} cy={11} r={8} />
                  </svg>
                  <input
                    placeholder="Search friends..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
                    defaultValue
                    fdprocessedid="ng02bi"
                  />
                </label>
              </div>
              <div className="space-y-3">
                {isLoading ? (
                  <Loading></Loading>
                ) : (
                  <>
                    {data?.data?.data?.suggestions.map((suggest) => (
                      <SuggestedCard
                        key={suggest?._id}
                        suggest={suggest}
                      ></SuggestedCard>
                    ))}
                  </>
                )}
              </div>
              <button
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                fdprocessedid="0w5mluj"
              >
                View more
              </button>
            </>
          )}
        </div>
      </aside>
      
    </>
  );
}
