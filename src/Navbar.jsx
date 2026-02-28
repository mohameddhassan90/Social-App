import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "./Context/AuthContext";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const { isLogin, setLogin, userData } = useContext(authContext);
  const [isOpen, setOpen] = useState(false);
  function toggleMenu() {
    setOpen(!isOpen);
  }
  const { data: count } = useQuery({
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
  

  function logOut() {
    setLogin(null);
    localStorage.removeItem("token");
    navigate("login");
  }
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3">
          <div className="flex items-center gap-3">
            <img
              alt="Route Posts"
              className="h-9 w-9 rounded-xl object-cover"
              src="https://i.ibb.co/zhDsG8YS/route.jpg"
            />
            <p className="hidden text-xl font-extrabold text-slate-900 sm:block">
              Route Posts
            </p>
          </div>
          <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
            <NavLink
              className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 bg-white "
              to={`/`}
            >
              <span className="relative">
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
                  className="lucide lucide-house"
                  aria-hidden="true"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </span>
              <span className="hidden sm:inline">Feed</span>
              <span className="sr-only sm:hidden">Feed</span>
            </NavLink>
            <NavLink
              className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900"
              to={`/profile`}
              data-discover="true"
            >
              <span className="relative">
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
                  className="lucide lucide-user"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
              </span>
              <span className="hidden sm:inline">Profile</span>
              <span className="sr-only sm:hidden">Profile</span>
            </NavLink>
            <NavLink
              className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900"
              to={`/notifictions`}
              data-discover="true"
            >
              <span className="relative">
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
                  className="lucide lucide-message-circle"
                  aria-hidden="true"
                >
                  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                </svg>
                <span className="absolute -right-2 -top-2 inline-flex min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-black leading-4 text-white">
                  {count?.data?.data?.unreadCount}
                </span>
              </span>
              <span className="hidden sm:inline">Notifications</span>
              <span className="sr-only sm:hidden">Notifications</span>
            </NavLink>
          </nav>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100"
              fdprocessedid="grbww"
            >
              <img
                alt={userData?.name}
                className="h-8 w-8 rounded-full object-cover"
                src={userData?.photo}
              />
              <span className="hidden max-w-35 truncate text-sm font-semibold text-slate-800 md:block">
                {userData?.name}{" "}
              </span>
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
                className="lucide cursor-pointer lucide-menu text-slate-500"
                aria-hidden="true"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <NavLink
                  onClick={toggleMenu}
                  to={`/profile`}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
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
                    className="lucide lucide-user"
                    aria-hidden="true"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                  Profile
                </NavLink>
                <NavLink
                  to={`/setting`}
                  onClick={toggleMenu}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
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
                    className="lucide lucide-settings"
                    aria-hidden="true"
                  >
                    <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                    <circle cx={12} cy={12} r={3} />
                  </svg>
                  Settings
                </NavLink>
                <div className="my-1 border-t border-slate-200" />
                <NavLink
                  to="/login"
                  onClick={logOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
