"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const givenName = searchParams.get("givenName");
  const occupation = searchParams.get("occupation");
  const country = searchParams.get("country");
  const duration = searchParams.get("duration");
  const preference = searchParams.get("preference");
  const budget = searchParams.get("budget");

  useEffect(() => {
    const generateItinerary = async () => {
      if (!occupation || !country || !duration || !budget) return;

      try {
        setLoading(true);

        const promptText = `Create a personalized ${duration}-day itinerary for ${givenName} visiting ${country} with a budget of ${budget}.
          About ${givenName}:
          - Works as a **${occupation}**
          - Has interests in: **${preference}**
          - Budget: **${budget}**

          Please include:
          - A detailed **Budget Breakdown** showing estimated costs for accommodation, food, transportation and activities
          - **Daily activities and attractions** aligned with their interests, with specific timing
          - **Recommended restaurants** and local cuisine with price ranges
          - **Travel tips** specific to ${country}
          - **Free and budget-friendly activity** suggestions
          - **Transportation recommendations**
          - **Safety tips** and cultural considerations
          
          Format the response with:
          1. **Budget Breakdown** section at the top
          2. **Day-by-day itinerary** with times and estimated costs
          3. **Travel Tips** section at the bottom
          4. All prices in **local currency with USD equivalent**`;

        const response = await fetch('/api/generate-itinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: promptText
                  }
                ]
              }
            ]
          })
        });

        const data = await response.json();
        setItinerary(data.candidates[0].content.parts[0].text);
        console.log(data.candidates[0].content.parts[0].text);
        
      } catch (err) {
        setError("Failed to generate itinerary. Please try again.");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    generateItinerary();
  }, [occupation, country, duration, givenName, preference, budget]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {loading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3">Generating your personalized itinerary...</span>
        </div>
      )}
      {error && <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>}
      {itinerary && (
        <div className="whitespace-pre-wrap bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">Your Personalized Itinerary</h1>
          <ReactMarkdown className="prose max-w-none">
            {itinerary}
          </ReactMarkdown>
          <button 
            onClick={() => router.push('/')}
            className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
