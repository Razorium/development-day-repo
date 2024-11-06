// pages/index.js
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
	const router = useRouter();

	const handleLoginClick = () => {
		router.push("/login");
	};

	return (
		<div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
			<div className="text-center text-white p-8 bg-opacity-75 bg-black rounded-lg shadow-lg">
				<h1 className="text-5xl font-bold mb-4">Finding Your Ideal Vacation</h1>
				<p className="text-xl mb-8">Welcome to Cathay Travel AI</p>
				<button
					onClick={handleLoginClick}
					className="text-xl px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-200 transition duration-300"
				>
					Log In
				</button>
			</div>
		</div>
	);
};

export default HomePage;
