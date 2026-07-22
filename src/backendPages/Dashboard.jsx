import React, { useEffect, useState } from "react";
import BackendLayout from "../Layouts/BackendLayout";
import api from "../api/axios";

function Dashboard() {
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const token = sessionStorage.getItem("token");

  const totaluser = async () => {
    try {
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalorder = async () => {
    try {
      const res = await api.get("/order/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalcategories = async () => {
    try {
      const res = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalProducts = async () => {
    try {
      const res = await api.get("/products");
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    totaluser();
    totalorder();
    totalcategories();
    totalProducts();
  }, []);

  const revenue = order.reduce(
    (sum, item) => sum + item.totalprice,
    0
  );

  return (
    <BackendLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">
            Total Users
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {user.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">
            Total Orders
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {order.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">
            Categories
          </h2>

          <p className="text-4xl font-bold text-yellow-500 mt-3">
            {category.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">
            Products
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-3">
            {product.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">
            Total Revenue
          </h2>

          <p className="text-3xl font-bold text-red-500 mt-3">
            Rs. {revenue}
          </p>
        </div>

      </div>
    </BackendLayout>
  );
}

export default Dashboard;