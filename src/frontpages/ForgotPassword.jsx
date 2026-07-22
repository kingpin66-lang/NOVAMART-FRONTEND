import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  Send,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import api from "../api/axios";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post(
        "/user/forgot-password",
        data
      );

      toast.success("Reset link sent to your email.");

      reset();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Email not found."
      );
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 py-10">

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl">

              <KeyRound
                size={38}
                className="text-cyan-600"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-white text-center mt-5">
            Forgot Password
          </h1>

          <p className="text-slate-300 text-center mt-2 px-8">
            Enter your registered email address and we'll send you a password reset link.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-6"
        >

          <div>

            <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">

              <Mail size={18} />

              Email Address

            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: true,
              })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 transition"
            />

          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold text-lg transition"
          >
            <Send size={20} />
            Send Reset Link
          </button>

        </form>

        {/* Footer */}

        <div className="pb-8 text-center">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-medium"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>

        </div>

      </div>

    </section>
  );
}

export default ForgotPassword;