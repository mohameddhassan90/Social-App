import { CardHeader } from "@heroui/react";
import React from "react";
import { changeDate } from "./utilties/FormatDate";

export default function Comment({ comment }) {


  
  const STATIC_IMAGE = `https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_user_personalization&w=740&q=80`;
  return (
    <>
    <p className="my-2 text-[13px] font-bold  tracking-wide text-slate-500">
            Top Comment
          </p>
          <div className="flex items-start gap-2">
            <img
            onError={(e) => (e.target.src = STATIC_IMAGE)}
              alt={comment?.commentCreator?.name}
              className="h-8 w-8 rounded-full object-cover"
              src={comment?.commentCreator?.photo}
            />
            <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
              <div className="flex gap-3 items-center">
              <p className="truncate text-xs font-bold text-slate-900">{comment?.commentCreator?.name}</p>
              <p className="text-sm text-neutral-500">
              {changeDate(comment?.createdAt)}
            </p>
              </div>
                <p className="truncate text-xs font-medium text-slate-900">@{comment?.commentCreator?.username}</p>
              <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                {comment?.content}
              </p>
              <img src={comment?.image} alt="" className="w-full max-h-80 object-cover" />
            </div>
          </div>
    </>
  );
}

