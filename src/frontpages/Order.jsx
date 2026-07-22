import axios from "axios";
import React, { useEffect, useState } from "react";
import FrontendLayout from "../Layouts/FrontendLayout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Order() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getOrders = async () => {
    const token = sessionStorage.getItem("token");

    const res = await api.get("/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(res.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const deleteOrder = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      await api.delete(`/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order cancelled successfully");
      getOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <FrontendLayout>
      <section className="min-h-screen bg-slate-900 py-14">
        <div className="max-w-5xl mx-auto px-6">

          <div className="mb-10">
            <h1 className="text-5xl font-black text-white">
              My Orders
            </h1>

            <p className="text-slate-400 mt-2">
              View and track your orders.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="bg-slate-800 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white">
                No Orders Yet
              </h2>

              <p className="text-slate-400 mt-3">
                Start shopping to place your first order.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">

                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>

                      <p className="text-slate-400">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <p className="text-slate-300">
                        Items: {order.products.length}
                      </p>

                      <p className="text-cyan-400 text-xl font-bold">
                        Total: Rs. {order.totalprice}
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3">

                      <span
                        className={`px-4 py-2 rounded-full font-semibold ${
                          order.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : order.status === "Delivered"
                            ? "bg-green-500/20 text-green-400"
                            : order.status === "Shipped"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {order.status}
                      </span>

                      <span
                        className={`px-4 py-2 rounded-full font-semibold ${
                          order.paymentstatus === "Paid"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        Payment: {order.paymentstatus}
                      </span>

                      <div className="flex gap-3 mt-3">

                        <button
                          onClick={() =>
                            navigate(`/order/${order._id}`)
                          }
                          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg text-white font-semibold"
                        >
                          View Details
                        </button>

                        {order.status === "Pending" && (
                          <button
                            onClick={() => deleteOrder(order._id)}
                            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-white font-semibold"
                          >
                            Cancel
                          </button>
                        )}

                      </div>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </FrontendLayout>
  );
}

export default Order;