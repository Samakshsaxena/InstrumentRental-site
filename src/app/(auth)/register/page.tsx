'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, username }),
        });

        const data = await res.json();

        if (res.ok) {
            alert('Registration successful! You can now sign in.');
            router.push('/login');
        } else {
            alert(data.message || 'Registration failed.');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left section */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-gray-900 via-black to-gray-700 text-white items-center justify-center p-10">
                <div className="text-center space-y-6">
                    <h1 className="text-5xl font-bold">🎵 Join the Music Vibe</h1>
                    <p className="text-lg max-w-md mx-auto">Create your account to explore and rent amazing instruments.</p>
                </div>
            </div>

            {/* Right section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
                <div className="max-w-md w-full space-y-6">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">Create Account 🎸</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-center">Sign up to start your musical journey</p>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white"
                                placeholder="Abc Saxena"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white"
                                placeholder="abcd   "
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-all cursor-pointer"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <a href="/login" className="text-black font-semibold hover:underline dark:text-white">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
