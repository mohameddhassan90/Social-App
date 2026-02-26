import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "./Context/AuthContext";

export default function Navbar() {
  const { isLogin, setLogin,userData } = useContext(authContext);

  const [isOpen, setOpen] = useState(true);
  const navigate =useNavigate()
  function toggler() {
    setOpen(!isOpen);
  }
  
function logOut(){
  setLogin(null)
  localStorage.removeItem('token')
  navigate('login')
}
  return (
    <>
      <nav className=" bg-linear-to-bl from-blue-500 to-blue-300 via-blue-400  w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-7xl flex flex-wrap md:flex-nowrap md:gap-15 items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl text-heading font-bold whitespace-nowrap">
              Social App
            </span>
          </a>
          <button
            onClick={toggler}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
          
          {!isLogin?<div
            className={`${isOpen && "hidden"} md:items-center md:flex md:justify-between`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <NavLink
                  to="/login"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>:<div
            className={`${isOpen && "hidden"} w-full md:items-center md:flex md:justify-between`}
            id="navbar-default"
          >
            <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <NavLink
                  to={`/profile`}
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  <img src={userData?.photo} alt="" className="size-8 rounded-full" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Home
                </NavLink>
              </li>
            </ul>
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <NavLink
                  to="/login"
                  onClick={logOut}
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  LogOut
                </NavLink>
              </li>
              </ul>
          </div>}
        </div>
      </nav>
    </>
  );
}
