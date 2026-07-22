import React, { useEffect, useState } from "react";
import BackendLayout from "../Layouts/BackendLayout";
import api from "../api/axios";
import { useForm } from "react-hook-form";

function Orders() {
  const [order, setOrder] = useState([]);
  const { register, handleSubmit } = useForm();

  const token = sessionStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await api.get("/order/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onSubmit = async (data, id) => {
    try {
      await api.put(`/order/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BackendLayout>
      <div className="space-y-6">

        {order.map((a) => (

          <div
            key={a._id}
            className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6"
          >

            {/* Header */}

            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 border-b border-slate-700 pb-5">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {a.user?.name || "Deleted User"}
                </h2>

                <p className="text-slate-400 mt-1">
                  {a.user?.email}
                </p>

                <p className="text-xs text-slate-500 mt-2 break-all">
                  Order ID: {a._id}
                </p>
              </div>

              <div className="text-right">
                <h2 className="text-3xl font-bold text-green-400">
                  Rs. {a.totalprice}
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>

            </div>

            {/* Products */}

            <div className="mt-6">

              <h3 className="text-xl font-semibold text-white mb-4">
                Ordered Products
              </h3>

              <div className="space-y-3">

                {a.products.map((item) => (

                  <div
                    key={item.product._id}
                    className="bg-slate-900 rounded-xl p-4 flex justify-between items-center"
                  >

                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {item.product.title}
                      </h4>

                      <p className="text-slate-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <h3 className="text-green-400 font-bold text-lg">
                      Rs. {item.product.price}
                    </h3>

                  </div>

                ))}

              </div>

            </div>

            {/* Update Form */}

            <form
              onSubmit={handleSubmit((data) => onSubmit(data, a._id))}
              className="grid md:grid-cols-3 gap-5 mt-8"
            >

              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Order Status
                </label>

                <select
                  {...register("status")}
                  defaultValue={a.status}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <div className="mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      a.status === "Delivered"
                        ? "bg-green-600 text-white"
                        : a.status === "Processing"
                        ? "bg-yellow-500 text-black"
                        : a.status === "Shipped"
                        ? "bg-blue-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Payment Status
                </label>

                <select
                  {...register("paymentstatus")}
                  defaultValue={a.paymentstatus}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>

                <div className="mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      a.paymentstatus === "Paid"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {a.paymentstatus}
                  </span>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold transition"
                >
                  Update Order
                </button>
              </div>

            </form>

          </div>

        ))}

      </div>
    </BackendLayout>
  );
}

export default Orders;