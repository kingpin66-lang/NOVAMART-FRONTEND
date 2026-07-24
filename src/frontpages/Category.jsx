import React, { useEffect, useState, useContext } from "react";
import FrontendLayout from "../Layouts/FrontendLayout";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import api from "../api/axios";

function Category() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const { addToCart } = useContext(CartContext);

  const catFetch = async () => {
    const res = await api.get(
      `/products?category=${id}`
    );
    setData(res.data);
  };

  useEffect(() => {
    catFetch();
  }, [id]);

  return (
    <FrontendLayout>

      {/* Hero */}

      <section className="bg-gradient-to-r from-slate-900 via-yellow-900 to-slate-900 text-white py-16">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-extrabold">

            {data.length > 0
              ? data[0].category.title
              : "Loading ..."}

          </h1>

          <p className="mt-4 text-gray-300 text-lg">
            {data.length} Products Available
          </p>

        </div>

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        {data.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {data.map((item) => (

              <div
                key={item._id}
                className="group"
              >

                {/* Image */}

                <div className="overflow-hidden rounded-xl bg-gray-100">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>

                {/* Info */}

                <div className="pt-5">

                  <h2 className="text-lg font-semibold line-clamp-1">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {item.category.title}
                  </p>

                  <p className="text-2xl font-bold mt-3 text-blue-600">
                    Rs. {item.price}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => addToCart(item._id)}
                      className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg transition"
                    >
                      Add to Cart
                    </button>

                    <Link
                      to={`/product/${item._id}`}
                      className="flex-1 border border-black rounded-lg py-3 text-center hover:bg-black hover:text-white transition"
                    >
                      View
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="text-center py-24">

            <h2 className="text-3xl font-semibold text-gray-500">
              No Products Found
            </h2>

          </div>

        )}

      </section>

    </FrontendLayout>
  );
}

export default Category;