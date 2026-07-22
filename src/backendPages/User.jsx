import React, { useEffect, useState } from "react";
import BackendLayout from "../Layouts/BackendLayout";
import api from "../api/axios";
import { useForm } from "react-hook-form";

function User() {
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(null);

  const token = sessionStorage.getItem("token");

  const { register, handleSubmit, reset } = useForm();

  const fetchUser = async () => {
    try {
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.put(
        `/user/${edit}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUser();

      setEdit(null);

      reset({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const update = (user) => {
    setEdit(user._id);

    reset({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BackendLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Update Form */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl text-white font-bold mb-5">
            Update User
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full p-3 rounded bg-slate-700 text-white outline-none"
            />

            <input
              {...register("email")}
              placeholder="Email"
              className="w-full p-3 rounded bg-slate-700 text-white outline-none"
            />

            <input
              {...register("password")}
              type="password"
              placeholder="New Password"
              className="w-full p-3 rounded bg-slate-700 text-white outline-none"
            />

            <select
              {...register("role")}
              className="w-full p-3 rounded bg-slate-700 text-white outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              disabled={!edit}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-bold disabled:bg-gray-500"
            >
              Update User
            </button>

            {edit && (
              <button
                type="button"
                onClick={() => {
                  setEdit(null);
                  reset({
                    name: "",
                    email: "",
                    password: "",
                    role: "user",
                  });
                }}
                className="w-full bg-red-500 hover:bg-red-600 py-3 rounded text-white"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* User List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">

          {users.map((user) => (
            <div
              key={user._id}
              className="bg-slate-800 rounded-xl p-5 shadow-lg"
            >
              <h2 className="text-xl text-white font-bold">
                {user.name}
              </h2>

              <p className="text-slate-300 mt-2">
                {user.email}
              </p>

              <p className="mt-2 text-cyan-400 font-semibold">
                Role: {user.role}
              </p>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => update(user)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </BackendLayout>
  );
}

export default User;