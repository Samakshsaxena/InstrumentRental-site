'use client';
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCart } from '@/context/CartContext'; // ✅ Import cart context

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);  
    const [userName, setUserName] = useState<string | null>(null);
    const { cartItems } = useCart(); // ✅ Get cart items

    useEffect(() => {
        const loadUser = () => {
            const user = localStorage.getItem('user');
            if (user) {
                const parsed = JSON.parse(user);
                setUserName(parsed.name);
            } else {
                setUserName(null);
            }
        };

        loadUser();
        window.addEventListener('storage', loadUser);
        return () => window.removeEventListener('storage', loadUser);
    }, []);

    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-7xl mx-auto z-50 ", className)}>
            <Menu setActive={setActive}>

                <Link href={"/"}>
                    <MenuItem setActive={setActive} active={active} item="Home" />
                </Link>

                <MenuItem setActive={setActive} active={active} item="Browse Instruments">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/guitar">Guitar</HoveredLink>
                        <HoveredLink href="/drum">Drum Kit</HoveredLink>
                        <HoveredLink href="/piano">Piano</HoveredLink>
                        <HoveredLink href="/violin">Violin</HoveredLink>
                    </div>
                </MenuItem>

                <MenuItem
                    setActive={setActive}
                    active={active}
                    item="About Us"
                    onClick={() => {
                        const footer = document.getElementById("footer");
                        if (footer) {
                            footer.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                />

                <Link href={"/cart"}>
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item={`Cart 🛒 (${cartItems?.length || 0})`} // ✅ Safe dynamic cart count
                    />
                </Link>

                <MenuItem setActive={setActive} active={active} item="Contact Us">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const target = e.target as typeof e.target & {
                                name: { value: string };
                                email: { value: string };
                            };

                            const name = target.name.value;
                            const email = target.email.value;

                            const res = await fetch("/api/sendContactEmail", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ name, email }),
                            });

                            if (res.ok) {
                                alert("Email sent successfully!");
                            } else {
                                alert("Failed to send email.");
                            }
                        }}
                        className="flex flex-col space-y-2 bg-black text-white p-4 rounded-md shadow-lg w-64"
                    >
                        <input type="text" name="name" placeholder="Your Name" required className="px-3 py-2 border border-gray-300 rounded" />
                        <input type="email" name="email" placeholder="Your Email" required className="px-3 py-2 border border-gray-300 rounded" />
                        <button type="submit" className="bg-black text-white py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                            Submit
                        </button>
                    </form>
                </MenuItem>

                {!userName ? (
                    <Link href={"/login"}>
                        <MenuItem setActive={setActive} active={active} item="Login/Register" />
                    </Link>
                ) : (
                    <MenuItem setActive={setActive} active={active} item={`Welcome ${userName.split(" ")[0]}`}>
                        <button
                            onClick={() => {
                                localStorage.removeItem('user');
                                window.location.reload();
                            }}
                            className="text-left text-red-500 hover:underline mt-2"
                        >
                            Logout
                        </button>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}

export default Navbar;
