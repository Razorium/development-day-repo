"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const FilterPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const givenName = searchParams.get("givenName");
	const occupation = searchParams.get("occupation");
	const [selectedContinent, setSelectedContinent] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedDuration, setSelectedDuration] = useState("");

	const continents = [
		"North America",
		"South America",
		"Europe",
		"Asia",
		"Oceania",
	];

	const durations = ["3-day", "5-day", "7-day"];

	const countriesByContinent = {
		"North America": [
			{ name: "USA", image: "/images/usa.jpeg" },
			{ name: "Canada", image: "/images/canada.jpeg" },
			{ name: "Mexico", image: "/images/mexico.jpeg" },
			{ name: "Costa Rica", image: "/images/costa-rica.jpeg" },
		],
		"South America": [
			{ name: "Brazil", image: "/images/brazil.jpeg" },
			{ name: "Argentina", image: "/images/argentina.jpeg" },
			{ name: "Peru", image: "/images/peru.jpeg" },
			{ name: "Colombia", image: "/images/colombia.jpeg" },
		],
		Europe: [
			{ name: "France", image: "/images/france.jpeg" },
			{ name: "Germany", image: "/images/germany.jpeg" },
			{ name: "Italy", image: "/images/italy.jpeg" },
			{ name: "Spain", image: "/images/spain.jpeg" },
		],
		Asia: [
			{ name: "Japan", image: "/images/japan.jpeg" },
			{ name: "China", image: "/images/china.jpeg" },
			{ name: "South Korea", image: "/images/south-korea.jpeg" },
			{ name: "Indonesia", image: "/images/indonesia.jpeg" },
		],
		Oceania: [
			{ name: "Australia", image: "/images/australia.jpeg" },
			{ name: "New Zealand", image: "/images/new-zealand.jpeg" },
			{ name: "Fiji", image: "/images/fiji.jpeg" },
			{ name: "Papua New Guinea", image: "/images/papua-new-guinea.jpeg" },
		],
	};

	const handleContinentChange = (e) => {
		setSelectedContinent(e.target.value);
		setSelectedCountry("");
	};

	const handleCountrySelect = (country) => {
		setSelectedCountry(country);
	};

	const handleDurationChange = (e) => {
		setSelectedDuration(e.target.value);
	};

	const handleGenerate = () => {
		if (selectedCountry && selectedDuration) {
			router.push(
				`/itinerary?continent=${selectedContinent}&country=${selectedCountry}&duration=${selectedDuration}&givenName=${givenName}&occupation=${occupation}`
			);
		} else {
			alert("Please select both a country and trip duration before generating");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
			<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
					Select Location
				</h2>

				<div className="mb-6">
					<label className="block text-gray-700 mb-2">Select Continent</label>
					<select
						value={selectedContinent}
						onChange={handleContinentChange}
						className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-gray-700"
					>
						<option value="">Choose a continent</option>
						{continents.map((continent) => (
							<option key={continent} value={continent}>
								{continent}
							</option>
						))}
					</select>
				</div>

				{selectedContinent && (
					<div className="mb-6">
						<label className="block text-gray-700 mb-2">Select Country</label>
						<div className="grid grid-cols-2 gap-4">
							{countriesByContinent[selectedContinent].map((country) => (
								<div
									key={country.name}
									onClick={() => handleCountrySelect(country.name)}
									className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
										selectedCountry === country.name
											? "border-indigo-600"
											: "border-transparent"
									}`}
								>
									<div className="relative h-32 w-full">
										<Image
											src={country.image}
											alt={country.name}
											fill
											style={{ objectFit: "cover" }}
										/>
									</div>
									<div className="p-2 text-center bg-white">
										<p className="text-gray-700">{country.name}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="mb-6">
					<label className="block text-gray-700 mb-2">
						Select Trip Duration
					</label>
					<select
						value={selectedDuration}
						onChange={handleDurationChange}
						className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-gray-700"
					>
						<option value="">Choose trip duration</option>
						{durations.map((duration) => (
							<option key={duration} value={duration}>
								{duration}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center justify-between">
					<button
						onClick={handleGenerate}
						disabled={!selectedCountry || !selectedDuration}
						className={`w-full px-4 py-2 rounded transition duration-300 ${
							selectedCountry && selectedDuration
								? "bg-indigo-600 hover:bg-indigo-700 text-white"
								: "bg-gray-300 cursor-not-allowed text-gray-500"
						}`}
					>
						Generate
					</button>
				</div>
			</div>
		</div>
	);
};

export default FilterPage;
