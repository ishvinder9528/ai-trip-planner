import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../../../service/GlobalApi";
import { Button } from "../../../ui/button";
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
    const [photoUrl, setPhotoUrl] = useState();
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label,
        };
        setLoading(true); // Set loading to true before fetching
        await GetPlaceDetails(data).then((resp) => {
            const photoUrl = PHOTO_REF_URL.replace("{NAME}", resp?.places[0]?.photos[0]?.name);
            setPhotoUrl(photoUrl);
            setLoading(false); // Set loading to false after fetching photo
        });
    };

    return (
        <div>
            {loading ? (
                // Show skeleton loader while the image is being fetched
                <div className="h-[300px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
            ) : (
                // Show the image after it is fetched
                <img
                    src={photoUrl|| '/placeholder.jpg'}
                    className="h-[300px] w-full object-cover rounded-xl"
                    alt={trip?.userSelection?.location?.label}
                />
            )}

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">📅 {trip?.userSelection?.noOfDays} Days</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">🥂 No. of Traveler: {trip?.userSelection?.traveller} People</h2>
                    </div>
                </div>

                <Button>
                    <IoIosSend />
                </Button>
            </div>
        </div>
    );
};

export default InfoSection;
