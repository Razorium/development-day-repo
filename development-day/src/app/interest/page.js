"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const SelectImages = () => {
	const SearchParams = useSearchParams();
	const userId = SearchParams.get("userId");
	const router = useRouter();
	const [selectedImages, setSelectedImages] = useState([]);
	const [loading, setLoading] = useState(false);
	let imagesToPush = "";

	const toggleSelect = (imgDesc) => {
		if (selectedImages.includes(imgDesc)) {
			setSelectedImages(
				selectedImages.filter((description) => description !== imgDesc)
			);
		} else {
			if (selectedImages.length < 10) {
				setSelectedImages([...selectedImages, imgDesc]);
			} else {
				alert("You can select up to 10 images.");
			}
		}
	};

	const handleSubmit = async () => {
		if (selectedImages.length < 5) {
			alert("Please select at least 5 images.");
			return;
		}

		setLoading(true);

		for (let i = 0; i < selectedImages.length; i++) {
			imagesToPush = imagesToPush + selectedImages[i] + ", ";
		}

		const toSend = { userId, imagesToPush };

		try {
			const response = await axios.put("/api/update", toSend);
			console.log(response.data);
			router.push("/");
		} catch (error) {
			console.error("Error submitting selections:", error);
			alert("Failed to submit selections. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const images = [
		{
			id: 1,
			url: "/interest-images/accomodation/accomodation1.jpeg",
			description: "Lodge Accomodation",
		},
		{
			id: 2,
			url: "/interest-images/accomodation/accomodation2.jpeg",
			description: "Hotel Accomodation",
		},
		{
			id: 3,
			url: "/interest-images/accomodation/accomodation3.jpeg",
			description: "Camping Accomodation",
		},
		{
			id: 4,
			url: "/interest-images/accomodation/accomodation4.jpeg",
			description: "Villa Accomodation",
		},
		{
			id: 5,
			url: "/interest-images/accomodation/accomodation5.jpeg",
			description: "Nature Hotel Accomodation",
		},
		{
			id: 6,
			url: "/interest-images/activity/activity1.jpeg",
			description: "Museum Activity",
		},
		{
			id: 7,
			url: "/interest-images/activity/activity2.jpeg",
			description: "Festival Activity",
		},
		{
			id: 8,
			url: "/interest-images/activity/activity3.jpeg",
			description: "Hiking Activity",
		},
		{
			id: 9,
			url: "/interest-images/activity/activity4.jpeg",
			description: "Shopping Activity",
		},
		{
			id: 10,
			url: "/interest-images/activity/activity5.jpeg",
			description: "Water Sports Activity",
		},
		{
			id: 11,
			url: "/interest-images/climate/climate1.jpeg",
			description: "Winter Season",
		},
		{
			id: 12,
			url: "/interest-images/climate/climate2.jpeg",
			description: "Summer Season",
		},
		{
			id: 13,
			url: "/interest-images/climate/climate3.jpeg",
			description: "Spring Season",
		},
		{
			id: 14,
			url: "/interest-images/climate/climate4.jpeg",
			description: "Autumn Season",
		},
		{
			id: 15,
			url: "/interest-images/climate/climate5.jpeg",
			description: "Rainy Season",
		},
		{
			id: 16,
			url: "/interest-images/cuisine/cuisine1.jpeg",
			description: "Japanese Cuisine",
		},
		{
			id: 17,
			url: "/interest-images/cuisine/cuisine2.jpeg",
			description: "Street Cuisine",
		},
		{
			id: 18,
			url: "/interest-images/cuisine/cuisine3.jpeg",
			description: "Meat Cuisine",
		},
		{
			id: 19,
			url: "/interest-images/cuisine/cuisine4.jpeg",
			description: "Dessert Cuisine",
		},
		{
			id: 20,
			url: "/interest-images/cuisine/cuisine5.jpeg",
			description: "Indian Cuisine",
		},
		{
			id: 21,
			url: "/interest-images/destination/destination1.jpeg",
			description: "Rural Destination",
		},
		{
			id: 22,
			url: "/interest-images/destination/destination2.jpeg",
			description: "High Rise Destination",
		},
		{
			id: 23,
			url: "/interest-images/destination/destination3.jpeg",
			description: "Nature Destination",
		},
		{
			id: 24,
			url: "/interest-images/destination/destination4.jpeg",
			description: "Cruise Destination",
		},
		{
			id: 25,
			url: "/interest-images/destination/destination5.jpeg",
			description: "Family Destination",
		},
		{
			id: 26,
			url: "/interest-images/transport/transport1.jpeg",
			description: "Taxi Transport",
		},
		{
			id: 27,
			url: "/interest-images/transport/transport2.jpeg",
			description: "Self drive Transport",
		},
		{
			id: 28,
			url: "/interest-images/transport/transport3.jpeg",
			description: "Subway Transport",
		},
		{
			id: 29,
			url: "/interest-images/transport/transport4.jpeg",
			description: "Walking Transport",
		},
		{
			id: 30,
			url: "/interest-images/transport/transport5.jpeg",
			description: "Bus Transport",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-indigo-900 mb-4">
						Customize Your Dream Vacation
					</h1>
					<p className="text-xl text-indigo-700 font-light">
						Select 5-10 images that inspire your perfect getaway
					</p>
					<div className="mt-4 bg-white rounded-lg p-3 inline-block shadow-sm">
						<span className="text-gray-600">
							Selected: {selectedImages.length} / 10
						</span>
					</div>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
					{images.map((image) => (
						<div
							key={image.id}
							className={`group relative cursor-pointer rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 ${
								selectedImages.includes(image.description)
									? "ring-4 ring-indigo-500"
									: ""
							}`}
							onClick={() => toggleSelect(image.description)}
						>
							<div className="aspect-w-1 aspect-h-1">
								<img
									src={image.url}
									alt={image.description}
									className="w-full h-48 object-cover"
								/>
							</div>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
								<p className="text-white text-sm font-medium">
									{image.description}
								</p>
							</div>
							{selectedImages.includes(image.description) && (
								<div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full p-2 shadow-lg">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
							)}
						</div>
					))}
				</div>

				<div className="flex justify-center mt-12">
					<button
						onClick={handleSubmit}
						className={`px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 ${
							loading
								? "opacity-50 cursor-not-allowed"
								: "hover:from-indigo-700 hover:to-indigo-900"
						}`}
						disabled={loading}
					>
						{loading ? (
							<div className="flex items-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Processing...
							</div>
						) : (
							"Continue to Your Journey"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SelectImages;
