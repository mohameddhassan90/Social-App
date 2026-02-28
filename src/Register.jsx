import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";
import { registerSchema } from "./Validation/rigester.schema";
import "axios";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [isLoading, setLoading] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
  });

  async function handleRegister(formData) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://route-posts.routemisr.com/users/signup`,
        formData,
      );
      toast.success("Success");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-[#f0f2f5] px-4 py-8 sm:py-12 lg:flex lg:items-center">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <section className="order-2 w-full max-w-xl text-center lg:order-1 lg:text-left">
            <h1 className="hidden text-5xl font-extrabold tracking-tight text-[#00298d] sm:text-6xl lg:block">
              Route Posts
            </h1>
            <p className="hidden mt-4 text-2xl font-medium leading-snug text-slate-800 lg:block">
              Connect with friends and the world around you on Route Posts.
            </p>
            <div className="mt-6 rounded-2xl border border-[#c9d5ff] bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">
                About Route Academy
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                Egypt's Leading IT Training Center Since 2012
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Route Academy is the premier IT training center in Egypt,
                established in 2012. We specialize in delivering high-quality
                training courses in programming, web development, and
                application development. We've identified the unique challenges
                people may face when learning new technology and made efforts to
                provide strategies to overcome them.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">
                    2012
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Founded
                  </p>
                </div>
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">
                    40K+
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Graduates
                  </p>
                </div>
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">50+</p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Partner Companies
                  </p>
                </div>
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">5</p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Branches
                  </p>
                </div>
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">20</p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Diplomas Available
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="order-1 w-full max-w-107.5 lg:order-2">
            <div className="rounded-2xl bg-white p-4 sm:p-6">
              <div className="mb-4 text-center lg:hidden">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d]">
                  Route Posts
                </h1>
                <p className="mt-1 text-base font-medium leading-snug text-slate-700">
                  Connect with friends and the world around you on Route Posts.
                </p>
              </div>
              <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                <NavLink
                  to={`/login`}
                  className="rounded-lg text-center py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800"
                >
                  Login
                </NavLink>
                <NavLink
                  to={`/register`}
                  className="rounded-lg text-center py-2 text-sm font-extrabold transition bg-white text-[#00298d] shadow-sm"
                >
                  Register
                </NavLink>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Create a new account
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                It is quick and easy.
              </p>
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="mt-5 space-y-3.5"
              >
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                        className="lucide lucide-user"
                        aria-hidden="true"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                    </span>
                    <input
                      placeholder="Full name"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="text"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                        className="lucide lucide-at-sign"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={4} />
                        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                      </svg>
                    </span>
                    <input
                      placeholder="Username (optional)"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="text"
                      {...register("username")}
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {errors.username?.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                        className="lucide lucide-at-sign"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={4} />
                        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                      </svg>
                    </span>
                    <input
                      placeholder="Email address"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="email"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                        className="lucide lucide-calendar"
                        aria-hidden="true"
                      >
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width={18} height={18} x={3} y={4} rx={2} />
                        <path d="M3 10h18" />
                      </svg>
                    </span>
                    <input
                      placeholder="Date of birth"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="date"
                      {...register(`dateOfBirth`)}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {errors.dateOfBirth?.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                        className="lucide lucide-key-round"
                        aria-hidden="true"
                      >
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                      </svg>
                    </span>
                    <input
                      placeholder="Password"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="password"
                      {...register(`password`)}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                        className="lucide lucide-key-round"
                        aria-hidden="true"
                      >
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                      </svg>
                    </span>
                    <input
                      placeholder="Confirm password"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="password"
                      {...register(`rePassword`)}
                    />
                  </div>
                  {errors.rePassword && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {errors.rePassword?.message}
                    </p>
                  )}
                </div>
                <div>
                  <fieldset className="flex justify-around">
                    <div className="flex items-center mb-4">
                      <input
                        id="male"
                        type="radio"
                        value="male"
                        className="w-4 h-4 text-neutral-primary  rounded-full checked:bg-blue-950 border border-default appearance-none"
                        {...register("gender")}
                      />
                      <label
                        htmlFor="male"
                        className="select-none ms-2 text-sm font-medium text-heading"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="female"
                        type="radio"
                        value="female"
                        className="w-4 h-4 text-neutral-primary  rounded-full checked:bg-blue-950 border border-default appearance-none"
                        {...register("gender")}
                      />

                      <label
                        htmlFor="female"
                        className="select-none ms-2 text-sm font-medium text-heading"
                      >
                        Female
                      </label>
                    </div>
                  </fieldset>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-xs font-semibold text-rose-600">
                    {errors.gender?.message}
                  </p>
                )}

                <button className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]">
                  {isLoading ? (
                    <i className="fa-solid fa-spin fa-spinner text-white"></i>
                  ) : (
                    "Create New Account"
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}



