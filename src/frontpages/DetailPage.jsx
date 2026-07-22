import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FrontendLayout from "../Layouts/FrontendLayout";
import { CartContext } from "../Context/CartContext";
import api from "../api/axios";

function DetailPage() {

    const navigate = useNavigate();


    const { id } = useParams();

    const { addToCart } = useContext(CartContext);
    const buyNow = async () => {
        await addToCart(data._id);
        navigate("/checkout");
    };
    const [data, setData] = useState(null);

    const fetchProduct = async () => {
        const res = await api.get(`/products/${id}`);
        setData(res.data);
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!data) {
        return <h2 className="text-center text-2xl mt-10">Loading...</h2>;
    }

    return (
        <FrontendLayout>

            <section className="min-h-screen bg-slate-900 py-16">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        {/* Image */}

                        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl">

                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-[550px] object-cover rounded-2xl hover:scale-105 duration-500"
                            />

                        </div>

                        {/* Details */}

                        <div>

                            <span className="inline-block bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full font-semibold">
                                {data.category?.title}
                            </span>

                            <h1 className="text-5xl font-black text-white mt-6">
                                {data.title}
                            </h1>

                            <p className="text-slate-300 leading-8 mt-6">
                                {data.description}
                            </p>

                            <div className="mt-8">

                                <h2 className="text-5xl font-black text-cyan-400">
                                    Rs. {data.price}
                                </h2>

                            </div>

                            <div className="mt-6">

                                {data.stock > 0 ? (

                                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold">
                                        ✔ In Stock ({data.stock})
                                    </span>

                                ) : (

                                    <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full font-semibold">
                                        Out of Stock
                                    </span>

                                )}

                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 mt-10">

                                <button
                                    onClick={async () => {
                                        await addToCart(data._id);
                                        navigate("/cart");
                                    }}
                                    className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 py-4 rounded-xl font-bold text-lg transition"
                                >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={buyNow}
                                    className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 py-4 rounded-xl font-bold text-lg transition"
                                >
                                    Buy Now
                                </button>

                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-12">

                                <div className="bg-slate-800 rounded-xl p-5 text-center">

                                    <p className="text-cyan-400 text-2xl">🚚</p>

                                    <p className="text-white font-semibold mt-2">
                                        Free Shipping
                                    </p>

                                </div>

                                <div className="bg-slate-800 rounded-xl p-5 text-center">

                                    <p className="text-cyan-400 text-2xl">🔒</p>

                                    <p className="text-white font-semibold mt-2">
                                        Secure Payment
                                    </p>

                                </div>

                                <div className="bg-slate-800 rounded-xl p-5 text-center">

                                    <p className="text-cyan-400 text-2xl">↩</p>

                                    <p className="text-white font-semibold mt-2">
                                        Easy Returns
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </FrontendLayout>
    );
}

export default DetailPage;