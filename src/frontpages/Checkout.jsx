import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FrontendLayout from "../Layouts/FrontendLayout";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import api from "../api/axios";

function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const navigate = useNavigate();

    const {
        cart,
        subtotal,
        clearCart,
    } = useContext(CartContext);

    const shipping = 100;
    const total = subtotal + shipping;
    const amount = total
    const placeOrder = async () => {

        const token = sessionStorage.getItem("token");

        try {

            if (paymentMethod === "cod") {

                await api.post(
                    "/order",
                    {
                        paymentMethod: "Cash on Delivery"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                await clearCart();

                toast.success("Order placed successfully!");

                navigate("/orders");

            } else if (paymentMethod === "esewa") {

                // eSewa integration goes here
                const { data } = await api.post('/payment/esewa', { amount });
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
                const fields = {
                    amount: amount,
                    tax_amount: 0,
                    total_amount: amount,
                    transaction_uuid: data.transaction_uuid,
                    product_code: data.productCode,
                    product_service_charge: 0,
                    product_delivery_charge: 0,
                    success_url: 'http://localhost:5173/success',
                    failure_url: 'http://localhost:5173/failure',
                    signed_field_names: 'total_amount,transaction_uuid,product_code',
                    signature: data.signature,
                };
                Object.keys(fields).forEach((key) => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = fields[key];
                    form.appendChild(input);
                });
                document.body.appendChild(form);
                form.submit();

                alert("Redirecting to eSewa...");

            };



        } catch (err) {
            console.log(err);
            console.log(err.response);
            console.log(err.response?.data);

            alert(err.response?.data?.message || err.message);
        }

    };

    return (
        <FrontendLayout>

            <section className="min-h-screen bg-slate-900 py-14">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="mb-12">

                        <h1 className="text-5xl font-black text-white">
                            Checkout
                        </h1>

                        <p className="text-slate-400 mt-3 text-lg">
                            Review your items and complete your purchase.
                        </p>

                    </div>

                    {cart.length > 0 ? (

                        <div className="grid lg:grid-cols-3 gap-8">

                            {/* Cart Products */}

                            <div className="lg:col-span-2 space-y-6">

                                {cart.map((item) => (

                                    <div
                                        key={item._id}
                                        className="bg-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-cyan-500/20 transition duration-300 flex gap-6 items-center"
                                    >

                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="w-28 h-28 rounded-2xl object-cover"
                                        />

                                        <div className="flex-1">

                                            <h2 className="text-2xl font-bold text-white">
                                                {item.product.title}
                                            </h2>

                                            <p className="text-slate-400 mt-2">
                                                Quantity : {item.quantity}
                                            </p>

                                            <p className="text-cyan-400 font-bold text-2xl mt-3">
                                                Rs. {item.product.price}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                            {/* Summary */}

                            <div className="bg-slate-800 rounded-3xl p-8 shadow-xl sticky top-24 h-fit">

                                <h2 className="text-3xl font-black text-white mb-8">
                                    Order Summary
                                </h2>

                                <div className="space-y-5">

                                    <div className="flex justify-between text-slate-300">

                                        <span>Subtotal</span>

                                        <span>Rs. {subtotal}</span>

                                    </div>

                                    <div className="flex justify-between text-slate-300">

                                        <span>Shipping</span>

                                        <span>Rs. {shipping}</span>

                                    </div>

                                    <hr className="border-slate-700" />

                                    <div className="flex justify-between text-3xl font-bold">

                                        <span className="text-white">
                                            Total
                                        </span>

                                        <span className="text-cyan-400">
                                            Rs. {total}
                                        </span>

                                    </div>

                                </div>

                                <div className="mt-10">

                                    <h3 className="text-white text-xl font-bold mb-5">
                                        Payment Method
                                    </h3>

                                    <label
                                        className={`flex items-center gap-4 rounded-2xl p-5 cursor-pointer border transition mb-4 ${paymentMethod === "cod"
                                                ? "border-cyan-500 bg-cyan-500/10"
                                                : "border-slate-700 bg-slate-900"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            value="cod"
                                            checked={paymentMethod === "cod"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />

                                        <span className="text-white font-semibold">
                                            Cash on Delivery
                                        </span>

                                    </label>

                                    <label
                                        className={`flex items-center gap-4 rounded-2xl p-5 cursor-pointer border transition ${paymentMethod === "esewa"
                                                ? "border-green-500 bg-green-500/10"
                                                : "border-slate-700 bg-slate-900"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            value="esewa"
                                            checked={paymentMethod === "esewa"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />

                                        <span className="text-white font-semibold">
                                            Pay with eSewa
                                        </span>

                                    </label>

                                </div>

                                <button
                                    onClick={placeOrder}
                                    className="w-full mt-10 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold text-lg transition duration-300"
                                >
                                    Place Order
                                </button>

                            </div>

                        </div>

                    ) : (

                        <div className="bg-slate-800 rounded-3xl p-20 text-center shadow-xl">

                            <h2 className="text-4xl font-black text-white">
                                Your Cart is Empty
                            </h2>

                            <p className="text-slate-400 mt-4">
                                Looks like you haven't added anything yet.
                            </p>

                            <button
                                onClick={() => navigate("/")}
                                className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-slate-900 px-8 py-4 rounded-2xl font-bold transition"
                            >
                                Continue Shopping
                            </button>

                        </div>

                    )}

                </div>

            </section>

        </FrontendLayout>
    );
}

export default Checkout;