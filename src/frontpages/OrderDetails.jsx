import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FrontendLayout from "../Layouts/FrontendLayout";
import api from "../api/axios";

function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");
    const [order, setOrder] = useState(null);

    const fetchSingleOrder = async () => {
        const res = await api.get(
            `/order/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data)
        setOrder(res.data);
    };

    useEffect(() => {
        fetchSingleOrder();
    }, [id]);

    if (!order) {
        return (
            <FrontendLayout>
                <div className="min-h-screen bg-slate-900 flex justify-center items-center">
                    <h1 className="text-3xl text-white font-bold">Loading...</h1>
                </div>
            </FrontendLayout>
        );
    }

    return (
        <FrontendLayout>
            <section className="min-h-screen bg-slate-900 py-12">

                <div className="max-w-6xl mx-auto px-6">

                    {/* Header */}

                    <div className="flex justify-between items-center mb-8">

                        <div>
                            <h1 className="text-4xl font-black text-white">
                                Order Details
                            </h1>

                            <p className="text-slate-400 mt-2">
                                Order #{order._id.slice(-8).toUpperCase()}
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/orders")}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                        >
                            Back
                        </button>

                    </div>

                    {/* Order Summary */}

                    <div className="grid md:grid-cols-4 gap-6 mb-8">

                        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
                            <p className="text-slate-400">Customer</p>
                            <h2 className="text-xl font-bold text-white mt-2">
                                {order.user.name}
                            </h2>
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
                            <p className="text-slate-400">Order Status</p>

                            <span
                                className={`inline-block mt-3 px-4 py-2 rounded-full font-semibold ${order.status === "Pending"
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
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
                            <p className="text-slate-400">Payment</p>

                            <span
                                className={`inline-block mt-3 px-4 py-2 rounded-full font-semibold ${order.paymentstatus === "Paid"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {order.paymentstatus}
                            </span>
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
                            <p className="text-slate-400">Total Amount</p>

                            <h2 className="text-3xl font-black text-cyan-400 mt-2">
                                Rs. {order.totalprice}
                            </h2>
                        </div>

                    </div>

                    {/* Products */}

                    <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold text-white mb-8">
                            Ordered Products
                        </h2>

                        <div className="space-y-6">

                            {order.products.map((item) => (

                                <div
                                    key={item._id}
                                    className="flex flex-col md:flex-row items-center gap-6 bg-slate-700 rounded-2xl p-5"
                                >

                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                        className="w-36 h-36 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">

                                        <h3 className="text-2xl font-bold text-white">
                                            {item.product.title}
                                        </h3>

                                        <p className="text-slate-400 mt-2">
                                            Quantity: {item.quantity}
                                        </p>

                                        <p className="text-slate-400">
                                            Price: Rs. {item.product.price}
                                        </p>

                                        <p className="text-cyan-400 text-xl font-bold mt-2">
                                            Subtotal: Rs. {item.product.price * item.quantity}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </section>
        </FrontendLayout>
    );
}

export default OrderDetails;