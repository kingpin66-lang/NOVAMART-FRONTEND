import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FrontendLayout from "../Layouts/FrontendLayout";
import { useNavigate } from "react-router-dom";
import { User, Mail, Save } from "lucide-react";
import api from "../api/axios";

function EditProfile() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const token = sessionStorage.getItem("token");

  const getProfile = async () => {
    try {
      const res = await api.get(
        "/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      reset({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.put(
        "/user/profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully");
      navigate("/profile");
    } catch (err) {
      alert("Unable to update profile.");
    }
  };

  return (
    <FrontendLayout>
      <section className="min-h-screen bg-slate-950 py-16">

        <div className="max-w-xl mx-auto px-6">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}

            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 py-10">

              <h1 className="text-4xl font-bold text-white text-center">
                Edit Profile
              </h1>

              <p className="text-slate-300 text-center mt-2">
                Keep your account information up to date
              </p>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 space-y-7"
            >

              {/* Name */}

              <div>

                <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">
                  <User size={20} />
                  Full Name
                </label>

                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your name"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-4 outline-none focus:border-cyan-500 transition"
                />

              </div>

              {/* Email */}

              <div>

                <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">
                  <Mail size={20} />
                  Email Address
                </label>

                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-4 outline-none focus:border-cyan-500 transition"
                />

              </div>

              {/* Buttons */}

              <div className="grid grid-cols-2 gap-4 pt-3">

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="border-2 border-slate-600 text-slate-300 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold transition"
                >
                  <Save size={20} />
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>
    </FrontendLayout>
  );
}

export default EditProfile;

