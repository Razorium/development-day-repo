"use client";

import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSearchParams } from "next/navigation";

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  
  const givenName = searchParams.get("givenName");
  const occupation = searchParams.get("occupation");
  const country = searchParams.get("country");
  const duration = searchParams.get("duration");
  const preference = searchParams.get("preference");

  const MODEL_NAME = "gemini-1.5-flash-002";
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  useEffect(() => {
    const generateItinerary = async () => {
      if (!occupation || !country || !duration) return;

      try {
        setLoading(true);
        
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `Create a personalized ${duration}-day itinerary for ${givenName} visiting ${country}.
          About ${givenName}:
          - Works as a ${occupation}
          - Has interests in: ${preference}

          Please include:
          - Daily activities and attractions aligned with their interests
          - Recommended restaurants and local cuisine
          - Travel tips specific to ${country}
          - Estimated timing for each activity
          - Estimated budget for the trip
          
          Format the itinerary in a clear, readable way with day-by-day breakdown.`;

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

    generateItinerary();
  }, [occupation, country, duration, givenName, preference]);

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
