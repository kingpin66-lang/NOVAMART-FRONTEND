import React from 'react'
import { useNavigate } from 'react-router-dom'
import FrontendLayout from '../Layouts/FrontendLayout'

function FailurePage() {
    const navigate = useNavigate()
    return (
        <>
            <FrontendLayout>

                <section className="container mx-auto px-6 py-20 flex justify-center">

                    <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-lg w-full">

                        <div className="text-6xl mb-5">
                            ❌
                        </div>

                        <h1 className="text-4xl font-bold text-red-600 mb-4">
                            Payment Failed
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Your payment could not be completed. Please try again.
                        </p>

                        <div className="flex justify-center gap-4">

                            <button
                                onClick={() => navigate("/checkout")}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                Try Again
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                            >
                                Continue Shopping
                            </button>

                        </div>

                    </div>

                </section>

            </FrontendLayout>
        </>
    )
}

export default FailurePage
