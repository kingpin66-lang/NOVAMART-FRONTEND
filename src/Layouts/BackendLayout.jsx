import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FolderTree,
  Package,
  LogOut
} from "lucide-react";

function BackendLayout({ children }) {

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white shadow-xl">

        <div className="text-center py-8 border-b border-gray-700">

          <h1 className="text-3xl font-bold text-blue-400">
            NovaMart
          </h1>

          <p className="text-gray-400 mt-2">
            Admin Panel
          </p>

        </div>

        <nav className="mt-8">

          <Link
            to="/admin-dashboard"
            className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition"
          >
            <LayoutDashboard size={22} />
            Dashboard
          </Link>

          <Link
            to="/admin-order"
            className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition"
          >
            <ShoppingCart size={22} />
            Orders
          </Link>

          <Link
            to="/admin-user"
            className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition"
          >
            <Users size={22} />
            Users
          </Link>

          <Link
            to="/admin-categories"
            className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition"
          >
            <FolderTree size={22} />
            Categories
          </Link>

          <Link
            to="/admin-products"
            className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition"
          >
            <Package size={22} />
            Products
          </Link>

        </nav>

        <div className="absolute bottom-8 left-6">

          <button
            onClick={logout}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg transition"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}

      <div className="flex-1">

        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h2>

          <div className="bg-blue-600 text-white px-4 py-2 rounded-full">
            Admin
          </div>

        </header>

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default BackendLayout;