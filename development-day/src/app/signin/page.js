// pages/login.js
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { countries } from "countries-list";

const LoginPage = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		familyName: "",
		givenName: "",
		email: "",
		age: "",
		country: "",
		password: "",
		occupation: "",
		university: "",
		otherCountry: "",
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validate = () => {
		let tempErrors = {};
		if (!formData.familyName)
			tempErrors.familyName = "Family name is required.";
		if (!formData.givenName) tempErrors.givenName = "Given name is required.";
		if (!formData.email) tempErrors.email = "Email is required.";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			tempErrors.email = "Email is invalid.";
		if (!formData.age) tempErrors.age = "Age is required.";
		if (!formData.country) tempErrors.country = "Country is required.";
		if (formData.country === "Other" && !formData.otherCountry)
			tempErrors.otherCountry = "Please specify your country.";

		if (!formData.occupation) tempErrors.occupation = "Occupation is required.";
		if (formData.occupation === "student" && !formData.university) {
			tempErrors.university = "University is required for students.";
		}
		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validate()) return;

		try {
			const response = await axios.post("/api/register", formData);
			console.log("User registered:", response.data);
			// Redirect to a success page or dashboard
		} catch (error) {
			console.error("Registration error:", error);
			// Handle error appropriately
			alert("Registration failed. Please try again.");
		}
	};

	const countryOptions = Object.values(countries).map((country) => (
		<option key={country.name} value={country.name}>
			{country.name}
		</option>
	));

	return (
		<div
			className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover"
			style={{ backgroundImage: 'url("loginbg.jpg")' }}
		>
			<div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full space-y-4">
				<h2 className="text-2xl font-bold text-blue-600">
					Create new account.
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex justify-between space-x-2">
						<input
							type="text"
							name="familyName"
							placeholder="Family Name"
							value={formData.familyName}
							onChange={handleChange}
							className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
						/>
						<input
							type="text"
							name="givenName"
							placeholder="Given Name"
							value={formData.givenName}
							onChange={handleChange}
							className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
						/>
					</div>
					<input
						type="text"
						name="age"
						placeholder="Age"
						value={formData.age}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
					/>
					<select
						name="country"
						value={formData.country}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
					>
						<option value="">Select Country</option>
						{countryOptions}
					</select>
					{formData.country === "Other" && (
						<input
							type="text"
							name="otherCountry"
							placeholder="Please specify your country"
							value={formData.otherCountry}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
						/>
					)}
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
					/>

					<div className="opacity-75">
						<select
							name="occupation"
							value={formData.occupation}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
						>
							<option value="">Select Occupation</option>
							<option value="student">Student</option>
							<option value="professional">Professional</option>
							<option value="other">Other</option>
						</select>
					</div>
					{formData.occupation === "student" && (
						<input
							type="text"
							name="university"
							placeholder="University"
							value={formData.university}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
						/>
					)}
					{formData.occupation === "other" && (
						<input
							type="text"
							name="otherDetails"
							placeholder="Please specify"
							value={formData.otherDetails}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
						/>
					)}
					<button
						type="submit"
						className="w-full p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
					>
						Create account
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
