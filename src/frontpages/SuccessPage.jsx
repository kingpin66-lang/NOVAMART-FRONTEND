import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FrontendLayout from "../Layouts/FrontendLayout";

function SuccessPage() {
    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {
            navigate("/orders");
        }, 6000);

        return () => clearTimeout(timer);

    }, []);
    return (
        <>
            <FrontendLayout>

                <section className="container mx-auto px-6 py-20 flex justify-center">

                    <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-lg w-full">

                        <div className="text-6xl mb-5">
                            ✅
                        </div>

                        <h1 className="text-4xl font-bold text-green-600 mb-4">
                            Payment Successful
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Thank you! Your payment has been completed successfully.
                        </p>

                        <button
                            onClick={() => navigate("/orders")}
                            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            View My Orders
                        </button>

                    </div>

                </section>

            </FrontendLayout>
        </>
    )
}

export default SuccessPage
