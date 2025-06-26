'use client'
import { useState, useEffect } from 'react';
import InstrumentData from "../data/Instrument_desciption.json";
import { BackgroundGradient } from "./ui/background-gradient";
import { useCart } from '@/context/CartContext';

interface Instruments {
    id: string,
    name: string,
    category: string,
    pricePerDay: number,
    availability: boolean,
    image: string,
    description: string,
}

function Popular_Instruments_Section() {
    const { addToCart, cartItems } = useCart();

    const featuredInstrument = InstrumentData.Description.filter(
        (instrument: Instruments) => instrument.availability
    );

    const [addedToCart, setAddedToCart] = useState<string[]>([]);

    // Sync button state with cart items in localStorage
    useEffect(() => {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const ids = existingCart.map((item: Instruments) => item.id);
        setAddedToCart(ids);
    }, [cartItems]); // re-sync when cart changes

    const handleAddToCart = (instrument: Instruments) => {
        if (addedToCart.includes(instrument.id)) return;

        addToCart(instrument); // ✅ updates context + localStorage
        setAddedToCart(prev => [...prev, instrument.id]); // ✅ for button UI
    };

    return (
        <div className="py-12 bg-gray-900">
            <div className="text-center">
                <h2 className="text-4xl text-teal-600 font-semibold tracking-wide uppercase">
                    Popular Instruments
                </h2>
                <p className="mt-4 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                    Play With The Best
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-4">
                {featuredInstrument.map((instrument: Instruments) => (
                    <div key={instrument.id} className="flex justify-center">
                        <BackgroundGradient>
                            <div className="flex flex-col justify-center text-center">
                                <p className="text-xl font-semibold text-white mb-3">{instrument.name}</p>
                                <img
                                    src={`/${instrument.image}`}
                                    alt={instrument.name}
                                    className="w-full h-auto rounded-lg"
                                />
                                <p className="text-gray-300 mb-4 px-4 leading-relaxed">{instrument.description}</p>
                                <p className="text-teal-400 font-medium">
                                    Price Per Day: ₹{instrument.pricePerDay}
                                </p>

                                <div className="flex justify-center gap-4 mt-5 mb-2.5 w-100">
                                    <button
                                        className="cursor-pointer rounded-2xl bg-green-700 w-30 py-2 px-4 text-white hover:bg-green-800 transition-all"
                                    >
                                        Rent Now
                                    </button>

                                    <button
                                        onClick={() => handleAddToCart(instrument)}
                                        className={`cursor-pointer rounded-2xl w-30 py-2 px-4 text-white transition-all ${
                                            addedToCart.includes(instrument.id)
                                                ? 'bg-gray-500 cursor-not-allowed'
                                                : 'bg-green-700 hover:bg-green-800'
                                        }`}
                                        disabled={addedToCart.includes(instrument.id)}
                                    >
                                        {addedToCart.includes(instrument.id) ? '✅ Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </BackgroundGradient>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Popular_Instruments_Section;
