'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState(''); 
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.dispatchEvent(new Event('storage'));
            router.push('/');
        } else {
            alert(data.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white items-center justify-center p-10">
                <div className="text-center space-y-6">
                    <h1 className="text-5xl font-bold">🎶 Start Your Musical Journey</h1>
                    <p className="text-lg max-w-md mx-auto">
                        Rent premium instruments. Play your passion.
                    </p>
                </div>
            </div>

            {/* Right */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-10 bg-white dark:bg-gray-900">
                <div className="max-w-md w-full space-y-6">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
                        Welcome Back 👋
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-white">
                                Email address / Username
                            </label>
                            <input
                                type="text"
                                id="identifier"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white"
                                required
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
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-all cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Don’t have an account?{' '}
                        <a href="/register" className="text-black font-semibold hover:underline dark:text-white">
                            Sign up here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
