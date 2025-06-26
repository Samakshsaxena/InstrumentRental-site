
    function Footer() {
        return (
            <div id="footer" className="relative h-[24rem] overflow-hidden flex items-center justify-center">
                <div>
                    <footer className="bg-black text-white py-10 px-4">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Logo and Tagline */}
                            <div>
                                <h2 className="text-xl font-bold">🎵 Instrument Rental</h2>
                                <p className="mt-2 text-sm text-gray-400">
                                    Rent the rhythm. Play your passion.
                                </p>
                            </div>

                            {/* Navigation Links */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                                <ul className="space-y-1 text-sm text-gray-400">
                                    <li><a href="/" className="hover:text-white">Home</a></li>
                                    <li><a href="/about" className="hover:text-white">About Us</a></li>
                                    <li><a href="/instruments" className="hover:text-white">Browse Instruments</a></li>
                                    <li><a href="/contact" className="hover:text-white">Contact</a></li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                                <p className="text-sm text-gray-400">Email: samakshjpr@gmail.com</p>
                                <p className="text-sm text-gray-400">Phone: +91 8890530000</p>
                                <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} Instrument Rental. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>

                </div>
            </div>
        )
    }

    export default Footer