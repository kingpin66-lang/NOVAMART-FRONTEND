import React, { useEffect, useState } from "react";
import BackendLayout from "../Layouts/BackendLayout";
import api from "../api/axios";
import { useForm } from "react-hook-form";

function Categories() {
  const [cat, setCat] = useState([]);
  const [edit, setEdit] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const token = sessionStorage.getItem("token");

  const fetchCat = async () => {
    try {
      const res = await api.get("/categories");
      setCat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const remove = async (a) => {
    try {
      await api.delete(`/categories/${a._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCat();
    } catch (err) {
      console.log(err);
    }
  };

  const update = (a) => {
    setEdit(a._id);

    reset({
      title: a.title,
    });
  };

  const onSubmit = async (data) => {
    try {
      if (edit) {
        await api.put(
          `/categories/${edit}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEdit(null);
      } else {
        await api.post(
          "/categories",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      reset({
        title: "",
      });

      fetchCat();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BackendLayout title="Categories">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Category Form */}
        <div className="lg:col-span-1 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl shadow-2xl p-8 text-white">

          <h2 className="text-3xl font-bold text-center mb-2">
            {edit ? "Update Category" : "Add Category"}
          </h2>

          <p className="text-center text-gray-300 mb-8">
            Manage NovaMart Categories
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 font-medium">
                Category Name
              </label>

              <input
                type="text"
                placeholder="Enter category name"
                {...register("title")}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3">

              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold"
              >
                {edit ? "Update Category" : "Add Category"}
              </button>

              {edit && (
                <button
                  type="button"
                  onClick={() => {
                    setEdit(null);
                    reset({ title: "" });
                  }}
                  className="bg-red-600 hover:bg-red-700 transition px-6 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {cat.map((a) => (
            <div
              key={a._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >

              <div className="flex justify-center mb-5">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-700">
                    {a.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-center text-gray-800">
                {a.title}
              </h2>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => update(a)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(a)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
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

export default Categories;