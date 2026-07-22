import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

function Register() {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await api.post(
        "/auth/register",
        data
      );

      toast.success(res.data.message || "Registration Successful!");

      reset();

      navigate("/login");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center py-10 px-6">

      <div className="w-full max-w-md">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 py-10">

            <h1 className="text-4xl font-bold text-center text-white">
              Create Account
            </h1>

            <p className="text-center text-slate-300 mt-2">
              Join NovaMart today.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 space-y-6"
          >

            {/* Name */}

            <div>

              <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">
                <User size={20} />
                Full Name
              </label>

              <input
                {...register("name")}
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-400 outline-none focus:border-cyan-500 transition"
              />

            </div>

            {/* Email */}

            <div>

              <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">
                <Mail size={20} />
                Email Address
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-400 outline-none focus:border-cyan-500 transition"
              />

            </div>

            {/* Password */}

            <div>

              <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">
                <Lock size={20} />
                Password
              </label>

              <div className="relative">

                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 pr-14 text-white placeholder-slate-400 outline-none focus:border-cyan-500 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition"
                >
                  {showPassword ? (
                    <EyeOff size={22} />
                  ) : (
                    <Eye size={22} />
                  )}
                </button>

              </div>

            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl text-lg font-bold transition"
            >
              <UserPlus size={20} />
              Register
            </button>

          </form>

          {/* Footer */}

          <div className="pb-8 text-center">

            <p className="text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Register;