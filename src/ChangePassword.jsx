import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChangePasswordSchema } from "./Validation/ChangePassowrd.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      rePassword: "",
    },
  });
  const navigate = useNavigate();

  const { data, isPending, mutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      toast.success(data?.data?.message);
    },
    onError: (error) => {
      console.log(error);

      toast.error(error?.response?.data?.message);
    },
    onSettled: () => {
      navigate(`/login`);
    },
  });

  function updatePassword(object) {
    return axios.patch(
      `https://route-posts.routemisr.com/users/change-password`,
      object,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  function handleChange(data) {
    const obj = {
      password: data?.password,
      newPassword: data?.newPassword,
    };
    mutate(obj);
  }

  return (
    <div>
      <main className="min-w-0">
        <div className="mx-auto max-w-2xl">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2]">
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
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Change Password
                </h1>
                <p className="text-sm text-slate-500">
                  Keep your account secure by using a strong password.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit(handleChange)} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Current password
                </span>
                <input
                  placeholder="Enter current password"
                  className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                  type="password"
                  name="currentPassword"
                  {...register(`password`)}
                />
              </label>
              {errors.password && (
                <p className="mt-1 text-xs font-semibold text-rose-600">
                  {errors.password?.message}
                </p>
              )}
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  New password
                </span>
                <input
                  placeholder="Enter new password"
                  className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                  type="password"
                  name="newPassword"
                  {...register(`newPassword`)}
                />
                {errors.newPassword ? (
                  <p className="mt-1 text-xs font-semibold text-rose-600">
                    {errors.newPassword?.message}
                  </p>
                ) : (
                  <span className="mt-1 block text-xs text-slate-500">
                    At least 8 characters with uppercase, lowercase, number, and
                    special character.
                  </span>
                )}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Confirm new password
                </span>
                <input
                  placeholder="Re-enter new password"
                  className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                  type="password"
                  name="confirmPassword"
                  {...register(`rePassword`)}
                />
              </label>
              {errors.rePassword && (
                <p className="mt-1 text-xs font-semibold text-rose-600">
                  {errors.rePassword?.message}
                </p>
              )}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
