import React, { useEffect, useState } from "react";
import BackendLayout from "../Layouts/BackendLayout";
import api from "../api/axios";
import { useForm } from "react-hook-form";

function Products() {
  const [edit, setEdit] = useState(null);
  const [product, setProduct] = useState([]);
  const [cat, setCat] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const token = sessionStorage.getItem("token");

  const fetchProduct = async () => {
    const res = await api.get("/products");
    setProduct(res.data);
  };

  const fetchcat = async () => {
    const res = await api.get("/categories");
    setCat(res.data);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    if (edit) {
      await api.put(
        `/products/${edit}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEdit(null);
      fetchProduct();

      reset({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
      });
    } else {
      await api.post(
        "/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProduct();
      fetchcat();

      reset({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
      });
    }
  };

  const remove = async (a) => {
    await api.delete(
      `/products/${a._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProduct();
  };

  useEffect(() => {
    fetchProduct();
    fetchcat();
  }, []);

  const update = (a) => {
    setEdit(a._id);

    reset({
      title: a.title,
      description: a.description,
      price: a.price,
      stock: a.stock,
      category: a.category._id,
    });
  };

  return (
    <div>
      <BackendLayout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">

          {/* Product Form */}
          <div className="lg:col-span-1 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl shadow-2xl p-8 text-white">

            <h2 className="text-3xl font-bold text-center mb-2">
              {edit ? "Update Product" : "Add Product"}
            </h2>

            <p className="text-center text-gray-300 mb-8">
              Manage your NovaMart products
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">Product Title</label>

                <input
                  type="text"
                  placeholder="Enter product title"
                  {...register("title")}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Description</label>

                <textarea
                  rows="4"
                  placeholder="Enter product description"
                  {...register("description")}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block mb-2 font-medium">Price</label>

                  <input
                    type="number"
                    placeholder="0"
                    {...register("price")}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Stock</label>

                  <input
                    type="number"
                    placeholder="0"
                    {...register("stock")}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
                  />
                </div>

              </div>

              <div>
                <label className="block mb-2 font-medium">Category</label>

                <select
                  {...register("category")}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
                >
                  <option value="">Select Category</option>

                  {cat.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Product Image</label>

                <input
                  type="file"
                  {...register("image")}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div className="flex gap-3 pt-3">

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold"
                >
                  {edit ? "Update Product" : "Add Product"}
                </button>

                {edit && (
                  <button
                    type="button"
                    onClick={() => {
                      setEdit(null);
                      reset();
                    }}
                    className="bg-red-600 hover:bg-red-700 px-6 rounded-lg"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

          </div>

          {/* Product List */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {product.map((a) => (
              <div
                key={a._id}
                className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl shadow-2xl overflow-hidden text-white"
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <h3 className="text-2xl font-bold mb-2">
                    {a.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4">
                    {a.description}
                  </p>

                  <div className="space-y-3">

                    <div className="flex justify-between">
                      <span>Price</span>
                      <span>${a.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Stock</span>
                      <span>{a.stock}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Category</span>
                      <span>{a.category?.title}</span>
                    </div>

                  </div>

                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={() => update(a)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => remove(a)}
                      className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </BackendLayout>
    </div>
  );
}

export default Products;