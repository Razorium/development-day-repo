// pages/login.js
"use client";

import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid.";
    if (!formData.password) tempErrors.password = "Password is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post("/api/login", formData);
      console.log("User logged in:", response.data);
      // Redirect to dashboard or home page
      // For example: router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center flex-1 px-4 sm:px-6 lg:flex-none lg:px-32 xl:px-36">
        <div className="mx-auto w-full max-w-md lg:w-108">
          <h1 className="text-4xl font-bold text-gray-900">Holla, Welcome Back</h1>
          <p className="mt-2 text-lg text-gray-600">Hey, welcome back to your special place</p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              />
              {errors.email && <p className="text-red-500 text-lg mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              />
              {errors.password && <p className="text-red-500 text-lg mt-1">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-lg text-center text-gray-600">
            Don't have an account? <a href="/signin" className="text-indigo-600 hover:text-indigo-500">Sign Up</a>
          </p>
        </div>
      </div>
      <div className="relative flex-1 hidden lg:block">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          src="frontend_img/loginimg.jpg"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
};

export default LoginPage;