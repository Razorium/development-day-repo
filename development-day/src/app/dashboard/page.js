// pages/dashboard.js
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
	const router = useRouter();
	const [selectedImages, setSelectedImages] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchSelections = async () => {
			try {
				const email = localStorage.getItem("userEmail");
				if (!email) {
					alert("User not identified. Please register again.");
					router.push("/");
					return;
				}

				const response = await axios.get("/api/user-selections", {
					params: { email },
				});

				setUser(response.data.user);
				setSelectedImages(response.data.images);
			} catch (error) {
				console.error("Error fetching selections:", error);
				alert("Failed to fetch selections.");
			}
		};

		fetchSelections();
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem("userEmail");
		router.push("/");
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8 text-gray-700">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">
					Welcome, {user ? user.givenName : "User"}!
				</h1>
				<button
					onClick={handleLogout}
					className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
				>
					Logout
				</button>
			</div>
			<h2 className="text-2xl font-semibold mb-4">Your Selected Images:</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{selectedImages.map((image) => (
					<div
						key={image.id}
						className="relative border rounded-lg overflow-hidden"
					>
						<img
							src={image.url}
							alt={image.description}
							className="w-full h-40 object-cover"
						/>
						<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
							{image.description}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
