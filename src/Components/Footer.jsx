
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* Brand */}

        <div>

          <h2 className="text-3xl font-bold text-blue-400">
            Nova Mart
          </h2>

          <p className="text-gray-400 mt-4 leading-7">
            Your one-stop destination for quality products at
            affordable prices. Shop with confidence and enjoy a
            seamless online shopping experience.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>

            {/* <li>
              <Link to="/products" className="hover:text-blue-400">
                Products
              </Link>
            </li> */}

            <li>
              <Link to="/cart" className="hover:text-blue-400">
                Cart
              </Link>
            </li>

         

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">

            <p>📍 Kathmandu, Nepal</p>

            <p>📧 support@novamart.com</p>

            <p>📞 +977 98XXXXXXXX</p>

          </div>

        </div>

        {/* Social */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <a
              href="#"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
            >
              <FaGithub />
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-800 py-5 text-center text-gray-400">

        © {new Date().getFullYear()} Nova Mart. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;

