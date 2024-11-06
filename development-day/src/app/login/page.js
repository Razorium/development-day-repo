// pages/login.js
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const router = useRouter();
	const [occupation, setOccupation] = useState("");
	const [formData, setFormData] = useState({
		familyName: "",
		givenName: "",
		email: "",
		age: "",
		country: "",
		phoneNumber: "",
		occupation: "",
		university: "",
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		if (name === "occupation") {
			setOccupation(value);
		}
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
		if (!formData.phoneNumber)
			tempErrors.phoneNumber = "Phone number is required.";
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
			const data = await fetch(`https://localhost:3000/api/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const response = await data.json();
			console.log("User registered:", response.data);
			// Redirect to a success page or dashboard
			router.push("/dashboard");
		} catch (error) {
			console.error("Registration error:", error);
			// Handle error appropriately
			alert("Registration failed. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 text-gray-700">
			<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-6 text-center ">Register</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Family Name</label>
						<input
							type="text"
							name="familyName"
							value={formData.familyName}
							onChange={handleChange}
							className={`w-full px-3 py-2 border ${
								errors.familyName ? "border-red-500" : "border-gray-300"
							} rounded mt-1`}
							required
						/>
						{errors.familyName && (
							<p className="text-red-500 text-sm mt-1">{errors.familyName}</p>
						)}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Given Name</label>
						<input
							type="text"
							name="givenName"
							value={formData.givenName}
							onChange={handleChange}
							className={`w-full px-3 py-2 border ${
								errors.givenName ? "border-red-500" : "border-gray-300"
							} rounded mt-1`}
							required
						/>
						{errors.givenName && (
							<p className="text-red-500 text-sm mt-1">{errors.givenName}</p>
						)}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={`w-full px-3 py-2 border ${
								errors.email ? "border-red-500" : "border-gray-300"
							} rounded mt-1`}
							required
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">{errors.email}</p>
						)}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Age</label>
						<input
							type="number"
							name="age"
							value={formData.age}
							onChange={handleChange}
							className={`w-full px-3 py-2 border ${
								errors.age ? "border-red-500" : "border-gray-300"
							} rounded mt-1`}
							required
						/>
						{errors.age && (
							<p className="text-red-500 text-sm mt-1">{errors.age}</p>
						)}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Country</label>
						<input
							type="text"
							name="country"
							value={formData.country}
							onChange={handleChange}
							className={`w-full px-3 py-2 border ${
								errors.country ? "border-red-500" : "border-gray-300"
							} rounded mt-1`}
							required
						/>
						{errors.country && (
							<p className="text-red-500 text-sm mt-1">{errors.country}</p>
						)}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Phone Number</label>
						<input
							type="tel"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleChange}
							className={`w-full px-3 py-2 border ${
								errors.phoneNumber ? "border-red-500" : "border-gray-300"
							} rounded mt-1`}
							required
						/>
						{errors.phoneNumber && (
							<p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
						)}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Occupation</label>
						<select
							name="occupation"
							value={formData.occupation}
							onChange={handleChange}
							className={`w-full px-3 py-2 border ${
								errors.occupation ? "border-red-500" : "border-gray-300"
							} rounded mt-1`}
							required
						>
							<option value="">Select Occupation</option>
							<option value="student">Student</option>
							<option value="professional">Professional</option>
							<option value="other">Other</option>
						</select>
						{errors.occupation && (
							<p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
						)}
					</div>

					{occupation === "student" && (
						<div className="mb-4">
							<label className="block text-gray-700">University</label>
							<input
								type="text"
								name="university"
								value={formData.university}
								onChange={handleChange}
								className={`w-full px-3 py-2 border ${
									errors.university ? "border-red-500" : "border-gray-300"
								} rounded mt-1`}
								required={occupation === "student"}
							/>
							{errors.university && (
								<p className="text-red-500 text-sm mt-1">{errors.university}</p>
							)}
						</div>
					)}

					<div className="flex items-center justify-between">
						<button
							type="submit"
							className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
						>
							Submit
						</button>
					</div>

					<div className="mt-4 text-center">
						<button
							type="button"
							onClick={() => router.push("/")}
							className="text-indigo-600 hover:underline"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
