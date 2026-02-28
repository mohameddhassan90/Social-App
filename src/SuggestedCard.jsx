import React from "react";

export default function SuggestedCard({ suggest }) {
  return (
    <div>
      <div className="cursor-pointer rounded-xl border border-slate-200 p-2.5">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
          >
            <img
              alt={suggest?.name}
              className="h-10 w-10 rounded-full object-cover"
              src={suggest?.photo}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                {suggest?.name}
              </p>
              <p className="truncate text-xs text-slate-500">
                @{suggest?.username}
              </p>
            </div>
          </button>
          <button
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]"
            fdprocessedid="cql8jd"
          >
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
              className="lucide lucide-user-plus"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx={9} cy={7} r={4} />
              <line x1={19} x2={19} y1={8} y2={14} />
              <line x1={22} x2={16} y1={11} y2={11} />
            </svg>
            Follow
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-0.5">
            {suggest?.followersCount} followers
          </span>
        </div>
      </div>
    </div>
  );
}
