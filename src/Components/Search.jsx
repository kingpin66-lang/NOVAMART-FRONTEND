import { useForm } from "react-hook-form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Search() {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        navigate(`/?search=${data.search}`);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-full"
        >

            <input
                {...register("search")}
                type="text"
                placeholder="Search products..."
                className="
                    w-full
                    py-3
                    pl-5
                    pr-12
                    rounded-full
                    bg-white
                    text-gray-700
                    border
                    border-gray-300
                    shadow-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-400
                    focus:border-cyan-400
                    transition
                "
            />

            <button
                type="submit"
                className="
                    absolute
                    right-2
                    top-1/2
                    -translate-y-1/2
                    bg-cyan-500
                    hover:bg-cyan-600
                    text-white
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition
                "
            >
                <FaSearch size={15} />
            </button>

        </form>
    );
}

export default Search;