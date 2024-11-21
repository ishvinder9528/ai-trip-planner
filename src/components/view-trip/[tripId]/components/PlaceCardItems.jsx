import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../../../service/GlobalApi";

const PlaceCardItems = ({ place }) => {
    const [photoUrl, setPhotoUrl] = useState();
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        if (place) {
            GetPlacePhoto();
        }
    }, [place]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place.placeName + "," + place.placeAddress
        };
        setLoading(true); // Set loading to true before fetching
        await GetPlaceDetails(data).then((resp) => {
            const photoUrl = PHOTO_REF_URL.replace("{NAME}", resp?.places[0]?.photos[0]?.name);
            setPhotoUrl(photoUrl);
            setLoading(false); // Set loading to false after fetching the photo
        });
    };

    return (
        <Link to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName + "," + place.placeAddress} target="_blank">
            <div className="border rounded-xl p-5 mt-2 flex gap-5 hover:scale-110 transition-all hover:cursor-pointer hover:shadow-xl">
                {loading ? (
                    // Skeleton loader for image while loading
                    <div className="w-[150px] h-[150px] bg-slate-200 animate-pulse rounded-xl"></div>
                ) : (
                    // Show the actual image after it's loaded
                    <img src={photoUrl} className="w-[150px] h-[150px] rounded-xl" />
                )}

                <div>
                    <h2 className="font-bold text-lg">{place.placeName}</h2>
                    <h2 className="text-sm text-gray-500">{place.placeDetails}</h2>
                    <h2 className="mt-2">🕙 {place.timeToTravel}</h2>
                    {/* <Button className='mt-3' size='lg'><FaMapMarkedAlt /></Button> */}
                </div>
            </div>
        </Link>
    );
};

export default PlaceCardItems;
