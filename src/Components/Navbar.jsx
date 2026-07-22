import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Search from "./Search";
import { CartContext } from "../Context/CartContext";
import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const token = sessionStorage.getItem("token");

  const { cartCount } = useContext(CartContext);

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const catFetch = async () => {
    try {
      const res = await api.get("/categories");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    catFetch();
  }, []);

  return (
    <nav className="sticky top-0 z-50 shadow-xl">

      {/* Top Navbar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-4">

          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              className="text-4xl font-extrabold tracking-wide text-cyan-400 hover:text-cyan-300 transition"
            >
              NovaMart
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:block w-[420px]">
              <Search />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">

              {/* Cart */}
              <Link
                to="/cart"
                className="relative hover:text-cyan-300 transition"
              >
                <ShoppingCart size={28} />

                <span className="absolute -top-2 -right-3 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow">
                  {cartCount}
                </span>
              </Link>

              {token ? (
                <div className="flex items-center gap-4">

                  <Link
                    to="/profile"
                    className="hover:text-cyan-300 transition"
                  >
                    <User size={28} />
                  </Link>

                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold transition"
                  >
                    Logout
                  </button>

                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold transition"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu */}
              <button
                className="lg:hidden "
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={30} /> : <Menu size={30} />}
              </button>

            </div>

          </div>

          {/* Mobile Search */}
          <div className="mt-4 lg:hidden">
            <Search />
          </div>

        </div>

      </div>

      {/* Desktop Categories */}
      <div className="hidden lg:block bg-slate-800 border-t border-slate-700">

        <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto px-6 py-3">

          <Link
            to="/"
            className="px-5 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition whitespace-nowrap"
          >
            Home
          </Link>

          {data.map((item) => (

            <Link
              key={item._id}
              to={`/category/${item._id}`}
              className="px-5 py-2 rounded-full bg-slate-700 text-gray-200 hover:bg-cyan-500 hover:text-white transition whitespace-nowrap"
            >
              {item.title}
            </Link>

          ))}

        </div>

      </div>

      {/* Mobile Menu */}
      {open && (

        <div className="lg:hidden bg-slate-900 text-white border-t border-slate-700">

          <div className="flex flex-col p-5 gap-4">

            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400"
            >
              Home
            </Link>

            {data.map((item) => (

              <Link
                key={item._id}
                to={`/category/${item._id}`}
                onClick={() => setOpen(false)}
                className="hover:text-cyan-400"
              >
                {item.title}
              </Link>

            ))}

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;