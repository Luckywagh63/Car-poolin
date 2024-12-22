"use client";

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white shadow-md p-5">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">Car Pooling</div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-blue-400">Home</a>
          <a href="/services" className="hover:text-blue-400">Services</a> {/* Updated link */}
          <a href="/about" className="hover:text-blue-400">About</a>
          <a href="/contact" className="hover:text-blue-400">Contact</a>
          {session ? (
            <>
              <a href="/profile" className="hover:text-blue-400">Profile</a>
              <button onClick={() => signOut()} className="hover:text-blue-400">Sign Out</button>
            </>
          ) : (
            <a href="/login" className="hover:text-blue-400">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
