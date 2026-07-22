
import axios from "axios";
import React, { useEffect, useState } from "react";
import FrontendLayout from "../Layouts/FrontendLayout";
import { Link } from "react-router-dom";
import { User, Mail, ShieldCheck, Package, Key, Pencil } from "lucide-react";
import api from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    const token = sessionStorage.getItem("token");

    const res = await api.get(
      "/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(res.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!user) {
    return (
      <FrontendLayout>
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <h2 className="text-3xl text-white font-semibold">
            Loading...
          </h2>
        </div>
      </FrontendLayout>
    );
  }

  return (
    <FrontendLayout>
      <section className="min-h-screen bg-slate-950 py-14">

        <div className="max-w-5xl mx-auto px-6">

          {/* Profile Card */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

            {/* Cover */}

            <div className="h-48 bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700"></div>

            {/* Profile */}

            <div className="px-10 pb-10">

              <div className="flex flex-col items-center -mt-20">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-4 border-slate-900 shadow-xl"
                />

                <h1 className="text-4xl font-bold text-white mt-5">
                  {user.name}
                </h1>

                <p className="text-cyan-400 capitalize text-lg mt-2">
                  {user.role}
                </p>

              </div>

              {/* Details */}

              <div className="grid md:grid-cols-2 gap-6 mt-12">

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500 transition">

                  <div className="flex items-center gap-3 text-cyan-400">

                    <User size={24} />

                    <h3 className="font-semibold">
                      Full Name
                    </h3>

                  </div>

                  <p className="text-white text-xl mt-4">
                    {user.name}
                  </p>

                </div>

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500 transition">

                  <div className="flex items-center gap-3 text-cyan-400">

                    <Mail size={24} />

                    <h3 className="font-semibold">
                      Email
                    </h3>

                  </div>

                  <p className="text-white text-lg mt-4 break-all">
                    {user.email}
                  </p>

                </div>

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500 transition">

                  <div className="flex items-center gap-3 text-cyan-400">

                    <ShieldCheck size={24} />

                    <h3 className="font-semibold">
                      Account Role
                    </h3>

                  </div>

                  <p className="text-white text-xl mt-4 capitalize">
                    {user.role}
                  </p>

                </div>

                <Link to="/orders">

                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500 transition cursor-pointer">

                    <div className="flex items-center gap-3 text-cyan-400">

                      <Package size={24} />

                      <h3 className="font-semibold">
                        My Orders
                      </h3>

                    </div>

                    <p className="text-white text-lg mt-4">
                      View Your Orders
                    </p>

                  </div>

                </Link>

              </div>

              {/* Buttons */}

              <div className="grid sm:grid-cols-2 gap-6 mt-12">

                <Link
                  to="/edit-profile"
                  className="flex justify-center items-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold text-lg transition"
                >
                  <Pencil size={22} />
                  Edit Profile
                </Link>

                <Link
                  to="/change-password"
                  className="flex justify-center items-center gap-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white py-4 rounded-xl font-bold text-lg transition"
                >
                  <Key size={22} />
                  Change Password
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>
    </FrontendLayout>
  );
}

export default Profile;

