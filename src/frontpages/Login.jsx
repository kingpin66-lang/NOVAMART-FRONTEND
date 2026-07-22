import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
  LogIn,
} from "lucide-react";
import api from "../api/axios";

function Login() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await api.post(
        "/auth/login",
        data
      );

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success(res.data.message);

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
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

              <ShoppingBag
                size={38}
                className="text-cyan-600"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-center text-white mt-5">
            Welcome Back
          </h1>

          <p className="text-center text-slate-300 mt-2">
            Login to your NovaMart account
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-6"
        >

          {/* Email */}

          <div>

            <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">
              <Mail size={18} />
              Email
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 transition"
            />

          </div>

          {/* Password */}

          <div>

            <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">
              <Lock size={18} />
              Password
            </label>

            <div className="relative">

              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 pr-14 text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
              >
                {showPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>

            </div>

          </div>

          <div className="flex justify-end">

            <Link
              to="/forgot-password"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <button
            className="w-full flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold text-lg transition"
          >
            <LogIn size={22} />
            Login
          </button>

          <div className="flex items-center">

            <div className="flex-1 border-t border-slate-700"></div>

            <span className="px-4 text-slate-500 text-sm">
              OR
            </span>

            <div className="flex-1 border-t border-slate-700"></div>

          </div>

          {/* Google Login */}
{/* 
          <button
            type="button"
            className="w-full bg-white hover:bg-gray-100 text-gray-800 py-4 rounded-xl font-semibold transition flex justify-center items-center gap-3"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-6 h-6"
              alt="Google"
            />
            Continue with Google
          </button> */}

          <p className="text-center text-slate-400">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </section>
  );
}

export default Login;