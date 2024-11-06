// pages/select-images.js
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

		console.log(imagesToPush);
		console.log(userId);

		const toSend = { userId, imagesToPush };

		try {
			const response = await axios.put("/api/update", toSend);
			console.log(response.data);
			router.push("/"); // Redirect to dashboard or next step
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
		<div className="min-h-screen bg-gray-100 p-8 text-gray-700">
			<h1 className="text-3xl font-bold text-center mb-8">
				Choose Your Preferred Vacation Images
			</h1>
			<h2 className="text-xl font-medium text-center mb-8">
				Select a minimum of 5 images and maximum of 10 images
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{images.map((image) => (
					<div
						key={image.id}
						className={`relative cursor-pointer border rounded-lg overflow-hidden ${
							selectedImages.includes(image.description)
								? "border-indigo-500"
								: "border-gray-300"
						}`}
						onClick={() => toggleSelect(image.description)}
					>
						<img
							src={image.url}
							alt={image.description}
							className="w-full h-40 object-cover"
						/>
						<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
							{image.description}
						</div>
						{selectedImages.includes(image.description) && (
							<div className="absolute top-0 right-0 bg-indigo-500 text-white rounded-full p-1 m-2">
								&#10003;
							</div>
						)}
					</div>
				))}
			</div>
			<div className="flex justify-center mt-8">
				<button
					onClick={handleSubmit}
					className={`px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ${
						loading ? "opacity-50 cursor-not-allowed" : ""
					}`}
					disabled={loading}
				>
					{loading ? "Submitting..." : "Proceed"}
				</button>
			</div>
		</div>
	);
};

export default SelectImages;
