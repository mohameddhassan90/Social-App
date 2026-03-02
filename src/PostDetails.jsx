import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import PostCard from "./PostCard";
import { useNavbar } from "@heroui/react";

export default function PosttDetails() {
  const { id } = useParams(); //id bta3 al post
  const navigate = useNavigate();
  function btnBack() {
    navigate(`/`);
  }
  const { isError, isLoading, data } = useQuery({
    queryKey: ["singlepost", id],
    queryFn: getSinglePost,
  });

  function getSinglePost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h1>Some Error</h1>;

  return (
    <div className="mx-auto max-w-7xl px-3 py-3.5">
      <div className="min-w-0">
        <div className="mx-auto max-w-3xl space-y-4">
          <button
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            onClick={btnBack}
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
              className="lucide lucide-arrow-left"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back
          </button>
          <PostCard post={data?.data?.data?.post} isHome={false}></PostCard>
        </div>
      </div>
    </div>
  );
}
