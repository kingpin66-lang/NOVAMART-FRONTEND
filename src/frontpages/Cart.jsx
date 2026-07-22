import React, { useContext } from "react";
import FrontendLayout from "../Layouts/FrontendLayout";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, subtotal, updateQuantity, removeCart } =
    useContext(CartContext);

  const shipping = 100;
  const total = subtotal + shipping;

  return (
    <FrontendLayout>
      <section className="min-h-screen bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="mb-12">
            <h1 className="text-5xl font-extrabold text-white">
              Shopping Cart
            </h1>
            <p className="text-slate-400 mt-2">
              {cart.length} {cart.length === 1 ? "Item" : "Items"} in your cart
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32">
              <h2 className="text-4xl font-bold text-white">
                Your Cart is Empty
              </h2>

              <p className="text-slate-400 mt-4">
                Looks like you haven't added anything yet.
              </p>

              <Link
                to="/"
                className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold text-white transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">

              {/* Cart Items */}

              <div className="lg:col-span-2 space-y-6">

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                      {/* Left */}

                      <div className="flex items-center gap-6">

                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-36 h-36 object-cover rounded-xl"
                        />

                        <div>

                          <h2 className="text-2xl font-bold text-white">
                            {item.product.title}
                          </h2>

                          <p className="text-cyan-400 text-xl mt-2">
                            Rs. {item.product.price}
                          </p>

                          <div className="flex items-center gap-4 mt-6">

                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(
                                    item._id,
                                    item.quantity - 1
                                  );
                                }
                              }}
                              className="w-10 h-10 rounded-lg bg-slate-800 text-white hover:bg-cyan-500 transition"
                            >
                              -
                            </button>

                            <span className="text-xl text-white font-bold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.quantity + 1
                                )
                              }
                              className="w-10 h-10 rounded-lg bg-slate-800 text-white hover:bg-cyan-500 transition"
                            >
                              +
                            </button>

                          </div>

                        </div>

                      </div>

                      {/* Right */}

                      <div className="flex flex-col items-end gap-4">

                        <h3 className="text-2xl font-bold text-white">
                          Rs. {item.product.price * item.quantity}
                        </h3>

                        <button
                          onClick={() => removeCart(item._id)}
                          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-white font-semibold transition"
                        >
                          Remove
                        </button>

                      </div>

                    </div>
                  </div>
                ))}

              </div>

              {/* Summary */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 h-fit sticky top-24">

                <h2 className="text-3xl font-bold text-white mb-8">
                  Order Summary
                </h2>

                <div className="space-y-5">

                  <div className="flex justify-between text-slate-300 text-lg">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>

                  <div className="flex justify-between text-slate-300 text-lg">
                    <span>Shipping</span>
                    <span>Rs. {shipping}</span>
                  </div>

                  <hr className="border-slate-700" />

                  <div className="flex justify-between text-3xl font-bold">

                    <span className="text-white">Total</span>

                    <span className="text-cyan-400">
                      Rs. {total}
                    </span>

                  </div>

                </div>

                <Link to="/checkout">

                  <button className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl text-lg font-bold text-white transition">
                    Proceed to Checkout
                  </button>

                </Link>

                <Link
                  to="/"
                  className="block text-center mt-5 text-slate-400 hover:text-cyan-400 transition"
                >
                  ← Continue Shopping
                </Link>

              </div>

            </div>
          )}
        </div>
      </section>
    </FrontendLayout>
  );
}

export default Cart;