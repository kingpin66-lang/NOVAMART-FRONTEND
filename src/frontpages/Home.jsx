import React, { useContext, useEffect, useState } from 'react'
import FrontendLayout from '../Layouts/FrontendLayout'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import { toast, ToastContainer } from 'react-toastify'
import api from '../api/axios'

function Home() {
    const navigate = useNavigate()
    const { addToCart } = useContext(CartContext);

    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";

    const [data, setData] = useState([]);

    const datafetch = async () => {
        const response = await api.get(
            `/products?search=${search}`
        );
        setData(response.data);
    };

    useEffect(() => {
        datafetch();
    }, [search]);
    return (
 <FrontendLayout>

  {/* Hero */}
  <section className="bg-gradient-to-r from-slate-900 via-yellow-900 to-slate-900 text-white py-20">

    <div className="max-w-7xl mx-auto px-6 text-center">

      <h1 className="text-6xl font-black">
        NovaMart
      </h1>

      <p className="text-xl mt-5 text-gray-300">
        Shop smarter. Live better.
      </p>

    </div>

  </section>

  {/* Products */}

  <section className="max-w-7xl mx-auto px-6 py-14">

    <div className="flex justify-between items-center mb-10">

      <div>

        <h2 className="text-4xl font-bold">
          Latest Products
        </h2>

        <p className="text-gray-500 mt-2">
          {data.length} products available
        </p>

      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

      {data.map((a) => (

        <div
          key={a._id}
          className="group"
        >

          {/* Image */}

          <div className="relative overflow-hidden rounded-xl bg-gray-100">

            <img
              src={a.image}
              alt={a.title}
              className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>

          </div>

          {/* Info */}

          <div className="pt-5">

            <h2 className="text-lg font-semibold text-gray-300 line-clamp-1">
              {a.title}
            </h2>

            <p className="text-2xl font-bold mt-2">
              Rs. {a.price}
            </p>

            <div className="flex gap-3 mt-5">

              <button
                onClick={() => addToCart(a._id)}
                className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Add
              </button>

              <Link
                to={`/product/${a._id}`}
                className="flex-1 text-center py-3 rounded-lg border border-black hover:bg-black hover:text-white transition"
              >
                Details
              </Link>

            </div>

          </div>

        </div>

      ))}

    </div>

  </section>

</FrontendLayout>
    );
}

export default Home;