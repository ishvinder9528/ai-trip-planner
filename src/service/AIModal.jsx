import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-002",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for Location: Goa, India, for 5 Days for 2 people with a Moderate budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url(important), geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url(important), Geo Coordinates, tickets, Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "I cannot directly access and display images or real-time pricing and availability for hotels.  Hotel prices and availability fluctuate constantly.  Also, image URLs would need to be scraped from a hotel booking site which is beyond my capabilities as a large language model.  However, I can provide you with a JSON structure containing the other information you requested, which you can then populate with data from your preferred hotel and travel booking websites.\n\n```json\n{\n  \"tripDetails\": {\n    \"location\": \"Goa, India\",\n    \"duration\": \"5 Days\",\n    \"travelers\": 2,\n    \"budget\": \"Moderate\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\",\n      \"hotelAddress\": \"Hotel Address 1, Goa\",\n      \"price\": \"Price Range (e.g., $50-$100 per night)\",\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_1\",\n      \"geoCoordinates\": \"[Latitude, Longitude]\",\n      \"rating\": 4.0,\n      \"description\": \"Hotel Description 1\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"hotelAddress\": \"Hotel Address 2, Goa\",\n      \"price\": \"Price Range (e.g., $75-$150 per night)\",\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_2\",\n      \"geoCoordinates\": \"[Latitude, Longitude]\",\n      \"rating\": 4.5,\n      \"description\": \"Hotel Description 2\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 3\",\n      \"hotelAddress\": \"Hotel Address 3, Goa\",\n      \"price\": \"Price Range (e.g., $30-$60 per night)\",\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_3\",\n      \"geoCoordinates\": \"[Latitude, Longitude]\",\n      \"rating\": 3.5,\n      \"description\": \"Hotel Description 3\"\n    }\n\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Baga Beach\",\n          \"placeDetails\": \"Famous for its vibrant atmosphere, water sports, and nightlife.\",\n          \"placeImageUrl\": \"URL_TO_BAGA_BEACH_IMAGE\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"tickets\": \"N/A\",\n          \"pricing\": \"Free entry\",\n          \"rating\": 4.5,\n          \"travelTime\": \"30 minutes\"\n        },\n        {\n          \"placeName\": \"Calangute Beach\",\n          \"placeDetails\": \"A long stretch of beach with lots of shacks and restaurants.\",\n          \"placeImageUrl\": \"URL_TO_CALANGUTE_BEACH_IMAGE\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"tickets\": \"N/A\",\n          \"pricing\": \"Free entry\",\n          \"rating\": 4.2,\n          \"travelTime\": \"15 minutes\"\n        }\n      ],\n      \"bestTime\": \"Morning or late afternoon\"\n    },\n    \"day2\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Old Goa Churches\",\n          \"placeDetails\": \"A UNESCO World Heritage Site with stunning historical churches.\",\n          \"placeImageUrl\": \"URL_TO_OLD_GOA_CHURCHES_IMAGE\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"tickets\": \"Entry fee applicable for some churches.\",\n          \"pricing\": \"Nominal entry fees (check online)\",\n          \"rating\": 4.8,\n          \"travelTime\": \"1 hour\"\n        },\n        {\n          \"placeName\": \"Spice Plantation\",\n          \"placeDetails\": \"Tour a spice plantation and learn about Goan spices.\",\n          \"placeImageUrl\": \"URL_TO_SPICE_PLANTATION_IMAGE\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"tickets\": \"Tour fee applicable\",\n          \"pricing\": \"Varies depending on the plantation\",\n          \"rating\": 4.0,\n          \"travelTime\": \"45 minutes\"\n        }\n      ],\n      \"bestTime\": \"Morning\"\n    },\n    \"day3\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Dudhsagar Falls\",\n          \"placeDetails\": \"A stunning waterfall, best experienced with a jeep safari.\",\n          \"placeImageUrl\": \"URL_TO_DUDHSAGAR_FALLS_IMAGE\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"tickets\": \"Jeep safari booking required.\",\n          \"pricing\": \"Varies depending on the tour operator\",\n          \"rating\": 4.7,\n          \"travelTime\": \"2-3 hours (travel time depends on location)\"\n        },\n          {\n          \"placeName\": \"Palolem Beach\",\n          \"placeDetails\": \"Serene beach known for its tranquility and beauty.\",\n          \"placeImageUrl\": \"URL_TO_PALOLEM_BEACH_IMAGE\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"tickets\": \"N/A\",\n          \"pricing\": \"Free entry\",\n          \"rating\": 4.6,\n          \"travelTime\": \"1.5-2 hours (travel time depends on location)\"\n        }\n\n      ],\n      \"bestTime\": \"Morning to avoid crowds\"\n    }\n  }\n}\n```\n\nRemember to replace the placeholder values (URLs, prices, coordinates, etc.) with actual data from your research.  You can use Google Maps, TripAdvisor, Booking.com, MakeMyTrip, or other travel websites to find the necessary information.  This JSON structure will help you organize your Goa trip plan effectively.  Remember to factor in travel time between locations.\n" },
            ],
        },
    ],

});

