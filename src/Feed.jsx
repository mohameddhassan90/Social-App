import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import Loading from "./Loading";
import { authContext } from "./Context/AuthContext";
import Suggested from "./Suggested";

export default function Feed() {
  const [whatIs, setWhatIs] = useState(`Community`);
  function btnFeed() {
    setWhatIs(`Feed`);
  }
  function btnCommunity() {
    setWhatIs(`Community`);
  }
  function btnMypost() {
    setWhatIs(`Mypost`);
  }
  function btnSave() {
    setWhatIs(`Save`);
  }
  //   myposts
  const { userData } = useContext(authContext);

  const {
    data: dataMypost,
    isError: isErrorMypost,
    isLoading: isLoadingMypost,
  } = useQuery({
    queryKey: [`userPosts`],
    queryFn: handleProfile,
  });

  function handleProfile() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userData?._id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  // community
  const {
    data: dataCommunity,
    isError: isErrorCommunity,
    isLoading: isLoadingCommunity,
  } = useQuery({
    queryKey: [`community`],
    queryFn: getCommunity,
  });

  function getCommunity() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  //   .....

  // feed
  const {
    data: dataFeed,
    isLoading: isLoadingFeed,
    isError: isErrorFeed,
  } = useQuery({
    queryKey: [`feed`],
    queryFn: getFeed,
  });
  function getFeed() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/feed?only=following&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  if (whatIs === "Feed" && isLoadingFeed) return <Loading />;
  if (whatIs === "Community" && isLoadingCommunity) return <Loading />;
  if (whatIs === "Mypost" && isLoadingMypost) return <Loading />;

  if (whatIs === "Mypost" && isErrorMypost) return <h1>Some Error</h1>;
  if (whatIs === "Feed" && isErrorFeed) return <h1>Some Error</h1>;
  if (whatIs === "Community" && isErrorCommunity) return <h1>Some Error</h1>;
  return (
    <div className="mx-auto max-w-7xl px-3 py-3.5">
      <main className="min-w-0">
        <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
          <aside className="hidden h-fit space-y-3 xl:sticky xl:top-21 xl:block">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <button
                className={whatIs==="Feed"?"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition bg-[#e7f3ff] text-[#1877f2]":"mt-1 cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition text-slate-700 hover:bg-slate-100"}
                onClick={btnFeed}
              >
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={17}
                  height={17}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-newspaper"
                  aria-hidden="true"
                >
                  <path d="M15 18h-5" />
                  <path d="M18 14h-8" />
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                  <rect width={8} height={4} x={10} y={6} rx={1} />
                </svg>
                Feed
              </button>
              <button
                className={whatIs==="Mypost"?"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition bg-[#e7f3ff] text-[#1877f2]":"mt-1 cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition text-slate-700 hover:bg-slate-100"}
                onClick={btnMypost}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={17}
                  height={17}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sparkles"
                  aria-hidden="true"
                >
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  <path d="M20 2v4" />
                  <path d="M22 4h-4" />
                  <circle cx={4} cy={20} r={2} />
                </svg>
                My Posts
              </button>
              <button
                className={whatIs==="Community"?"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition bg-[#e7f3ff] text-[#1877f2]":"mt-1 cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition text-slate-700 hover:bg-slate-100"}
                onClick={btnCommunity}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={17}
                  height={17}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-earth"
                  aria-hidden="true"
                >
                  <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                  <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                  <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                  <circle cx={12} cy={12} r={10} />
                </svg>
                Community
              </button>
              <button
                className={whatIs==="Save"?"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition bg-[#e7f3ff] text-[#1877f2]":"mt-1 cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition text-slate-700 hover:bg-slate-100"}
                onClick={btnSave}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={17}
                  height={17}
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
                Saved
              </button>
            </div>
          </aside>

          <section className="space-y-4">
            <CreatePost></CreatePost>
            {whatIs === `Feed` && (
              <div className="grid grid-col-1 gap-5 my-3">
                {dataFeed?.data?.data?.posts?.map((post) => (
                  <PostCard key={post._id} post={post} isHome></PostCard>
                ))}
              </div>
            )}
            {whatIs === `Community` && (
              <div className="grid grid-col-1 gap-5 my-3">
                {dataCommunity?.data?.data?.posts?.map((post) => (
                  <PostCard key={post._id} post={post} isHome></PostCard>
                ))}
              </div>
            )}
            {whatIs === `Mypost` && (
              <div className="grid grid-col-1 gap-5 my-3">
                {dataMypost?.data?.data?.posts?.map((post) => (
                  <PostCard key={post._id} post={post} isHome></PostCard>
                ))}
              </div>
            )}
            {whatIs === `Save` && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                  No posts yet. Be the first one to publish.
                </div>
              </div>
            )}
          </section>

          <Suggested></Suggested>
        </div>
      </main>
    </div>
  );
}
