"use client";

import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

export default function ItineraryPage({ country, duration }) {
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const MODEL_NAME = "gemini-1.5-flash-002";
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/1');
        const data = response.data;
        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch user data:", err.message);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const generateItinerary = async () => {
      if (!userData) return;

      try {
        setLoading(true);
        
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `Create a detailed day-by-day itinerary for a ${duration}-day trip to ${country}. 
          The traveler works as a ${userData.occupation}. Include:
          - Daily activities and attractions
          - Recommended restaurants
          - Travel tips specific to the location
          - Estimated timing for each activity
          Please format it in a clear, readable way.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        setItinerary(response.text());
        
      } catch (err) {
        setError("Failed to generate itinerary. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.occupation) {
      generateItinerary();
    }
  }, [userData, country, duration]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {loading && <div>Generating your personalized itinerary...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {itinerary && (
        <div className="whitespace-pre-wrap">
          <h1 className="text-2xl font-bold mb-4">Your Personalized Itinerary</h1>
          {itinerary}
        </div>
      )}
    </div>
  );
}
