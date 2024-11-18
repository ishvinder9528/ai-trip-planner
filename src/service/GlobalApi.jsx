import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
    headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        "X-Goog-FieldMask": "places.photos,places.displayName,places.id", // Must be a comma-separated string
    },
};

export const GetPlaceDetails = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data, config);
        return response.data; // Return the API response data
    } catch (error) {
        console.error("Error in GetPlaceDetails:", error.message);
        throw error; // Rethrow the error for handling in the calling function
    }
};

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=3200&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
