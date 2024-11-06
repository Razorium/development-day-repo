// pages/index.js
"use client"
import React, { useRef } from "react";
import Link from "next/link";

const HomePage = () => {
  const backgroundRef = useRef(null);

  return (
    <div ref={backgroundRef} className="min-h-screen bg-white flex flex-col" style={{
      backgroundImage: "url(frontend_img/neom-eOWabmCNEdg-unsplash.jpg)",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex items-center justify-between py-1 px-4">
          <div className="flex items-center">
            <img
              src="frontend_img/cathay-airways9549.logowik.com.jpg" // Replace with your logo, inspired by Cathay Pacific's branding
              alt="Cathay Travel AI"
              className="w-40 h-auto"
            />
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/signin" legacyBehavior>
              <a className="text-gray-700 hover:text-green-600 transition duration-300">
                Sign Up
              </a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a className="text-gray-700 hover:text-green-600 transition duration-300">
                Log In
              </a>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center">
        <div className="container mx-auto flex flex-col items-center justify-center text-center py-20 px-6">
          <h1 className="text-5xl font-semibold text-gray-800 mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Plan and book your dream vacation with Cathay Travel AI.
          </p>
          <div className="flex space-x-4">
            <Link href="/explore" legacyBehavior>
              <a className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
                Explore
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
