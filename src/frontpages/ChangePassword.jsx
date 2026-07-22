import axios from "axios";
import { useState } from "react";
import FrontendLayout from "../Layouts/FrontendLayout";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  KeyRound,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "../api/axios";

function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      return toast.error("Please fill in all fields.");
    }

    const token = sessionStorage.getItem("token");

    try {
      const res = await api.put(
        "/user/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Password changed successfully!");

      setCurrentPassword("");
      setNewPassword("");

      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <FrontendLayout>
      <section className="min-h-screen bg-slate-950 py-16">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 py-10">
              <h1 className="text-4xl font-bold text-center text-white">
                Change Password
              </h1>

              <p className="text-slate-300 text-center mt-2">
                Keep your NovaMart account secure.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Current Password */}
              <div>
                <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">
                  <Lock size={20} />
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 pr-14 text-white outline-none focus:border-cyan-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition"
                  >
                    {showCurrent ? (
                      <EyeOff size={22} />
                    ) : (
                      <Eye size={22} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="flex items-center gap-2 text-cyan-400 font-medium mb-3">
                  <KeyRound size={20} />
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 pr-14 text-white outline-none focus:border-cyan-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition"
                  >
                    {showNew ? (
                      <EyeOff size={22} />
                    ) : (
                      <Eye size={22} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold text-lg transition"
              >
                <Save size={20} />
                Change Password
              </button>
            </form>

            {/* Footer */}
            <div className="px-8 pb-8 text-center">
              <Link
                to="/forgot-password"
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}

export default ChangePassword;