import { useEffect, useState } from "react"
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi"
import { Link } from "react-router-dom"

const UserTripCardItem = ({ trip }) => {

    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
        GetPlacePhoto()
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
        <Link to={'/view-trip/' + trip?.id}>
            <div className="md:hover:scale-105 transition-all md:hover:shadow-lg rounded-lg">
                <img src={photoUrl}
                    className="rounded-xl object-cover w-full h-[150px] md:h-[250px] " />

                <div>
                    <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                    <h2 className="text-sm text-gray-500">{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCardItem