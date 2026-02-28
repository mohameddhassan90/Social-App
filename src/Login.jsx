import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema } from "./Validation/login.schema";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "./Context/AuthContext";

export default function Login() {
  const { isLogin, setLogin } = useContext(authContext);

  const [isLoading, setLoading] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(formData) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://route-posts.routemisr.com/users/signin`,
        formData,
      );

      const token = data?.data?.token;
      localStorage.setItem("token", token);
      setLogin(token);

      toast.success("Login success");
      navigate(`/`);
    } catch (error) {
      toast.error("invaild email or password");
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
                  className="rounded-lg text-center py-2 text-sm font-extrabold transition bg-white text-[#00298d] shadow-sm"
                >
                  Login
                </NavLink>
                <NavLink
                  to={`/register`}
                  className="rounded-lg text-center py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800"
                >
                  Register
                </NavLink>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Log in to Route Posts
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Log in and continue your social journey.
              </p>
              <form
                onSubmit={handleSubmit(handleLogin)}
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
                      placeholder="Email..."
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
                      {...register("password")}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="cursor-pointer w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-spin fa-spinner text-white"></i>
                  ) : (
                    "Log In"
                  )}
                </button>
                <button
                  type="button"
                  className="cursor-pointer mx-auto block text-sm font-semibold text-[#00298d] transition hover:underline"
                >
                  Forgot password?
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// <form
//   onSubmit={handleSubmit(handleLogin)}
//   className="shadow-2xl max-w-md mx-auto p-8 my-10 rounded-3xl bg-linear-to-br from-blue-600 to-blue-400 via-blue-300"
// >
//   <div className="relative z-0 w-full mb-5 group">
//     <input
//       type="email"
//       id="floating_email"
//       className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
//       placeholder=" "
//       {...register("email")}
//     />
//     {errors.email && (
//       <p className="bg-red-400 rounded-2xl p-2">{errors.email?.message}</p>
//     )}

//     <label
//       htmlFor="floating_email"
//       className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
//     >
//       Email address
//     </label>
//   </div>
//   <div className="relative z-0 w-full mb-5 group">
//     <input
//       type="password"
//       id="password"
//       className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
//       placeholder=" "
//       {...register("password")}
//     />
//     {errors.password && (
//       <p className="bg-red-400 rounded-2xl p-2">{errors.password?.message}</p>
//     )}

//     <label
//       htmlFor="password"
//       className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
//     >
//       Password
//     </label>
//   </div>

//   <button
//     type="submit"
//     className=" relative left-1/2 -translate-x-1/2 text-white bg-blue-950 rounded-2xl cursor-pointer box-bordezr border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 "
//   >
//     {isLoading ? (
//       <i className="fa-solid fa-spin fa-spinner text-white"></i>
//     ) : (
//       "Login"
//     )}
//   </button>
//   <p className="p-2 text-center">
//     Dont Have Account?
//     <NavLink className="px-3 font-bold text-green-800" to="/register">
//       Register
//     </NavLink>
//   </p>
// </form>;
