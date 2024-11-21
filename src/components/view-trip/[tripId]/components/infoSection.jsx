import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL, } from "../../../../service/GlobalApi";
import { Button } from "../../../ui/button"
import { IoIosSend } from "react-icons/io";


const InfoSection = ({ trip }) => {
    const [photoUrl, setPhotoUrl] = useState()
    useEffect(() => {
        trip && GetPlacePhoto()
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        await GetPlaceDetails(data).then((resp) => {            
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp?.places[0]?.photos[0]?.name)
            setPhotoUrl(photoUrl)
        })
    }

    return (
        <div>
            <img src={photoUrl} className="h-[300px] w-full object-cover rounded-xl" />

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">📅 {trip?.userSelection?.noOfDays} Days</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">🥂 No. of Traveler: {trip?.userSelection?.traveller} People</h2>
                    </div>
                </div>

                <Button><IoIosSend /></Button>

            </div>
        </div>
    )
}

export default InfoSection