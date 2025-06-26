'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div className="pt-32 px-8 min-h-screen bg-black text-white">
            <h2 className="text-4xl font-bold mb-8 text-center">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-lg text-gray-400 text-center">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#5B7B7A] p-4 rounded-lg shadow-md flex flex-col items-center justify-between"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold">{item.name}</h3>
                            <p className="text-gray-400 mb-2">₹{item.pricePerDay}/day</p>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-2 cursor-pointer"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
