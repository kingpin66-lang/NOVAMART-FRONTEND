import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FrontendLayout from "../Layouts/FrontendLayout";
import api from "../api/axios";

function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset
    } = useForm();

    const onSubmit = async (data) => {

        try {

            await api.put(
                `/user/reset-password/${token}`,
                {
                    password: data.password
                }
            );

            alert("Password reset successfully.");

            reset();

            navigate("/login");

        } catch (err) {

            alert(err.response?.data?.message);

        }

    };

    return (

        <FrontendLayout>

            <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Reset Password
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            New Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter New Password"
                            {...register("password", {
                                required: true
                            })}
                            className="w-full border p-3 rounded-lg"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", {
                                validate: value =>
                                    value === watch("password") ||
                                    "Passwords do not match"
                            })}
                            className="w-full border p-3 rounded-lg"
                        />

                    </div>

                    <button
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                    >
                        Reset Password
                    </button>

                </form>

            </div>

        </FrontendLayout>

    );
}

export default ResetPassword;