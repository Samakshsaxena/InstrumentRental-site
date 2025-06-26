'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Instrument {
    id: string;
    name: string;
    category: string;
    pricePerDay: number;
    availability: boolean;
    image: string;
    description: string;
}

interface CartContextType {
    cartItems: Instrument[];
    addToCart: (item: Instrument) => void;
    removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<Instrument[]>([]);

    // ✅ Load from localStorage on first render
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // ✅ Update localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: Instrument) => {
        const exists = cartItems.some((i) => i.id === item.id);
        if (!exists) {
            setCartItems(prev => [...prev, item]);
        }
    };

    const removeFromCart = (id: string) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
