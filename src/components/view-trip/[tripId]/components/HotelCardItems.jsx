import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetPlaceDetails, PHOTO_REF_URL } from "../../../../service/GlobalApi"


const HotelCardItems = ({ hotel }) => {
    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
        GetPlacePhoto()
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel.hotelName + "," + hotel.hotelAddress
        }
        await GetPlaceDetails(data).then((resp) => {

            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp?.places[0]?.photos[2]?.name)
            console.log("photoUrl: " + photoUrl);
            
            setPhotoUrl(photoUrl)
        })
    }

    return (
        <div className="hover:scale-110 hover:shadow-xl hover:cursor-pointer hover:rounded-2xl transition-all">
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel.hotelAddress} target="_blank">
                <img
                    src={photoUrl}
                    alt={hotel.hotelName}
                    className="rounded-xl w-full h-[300px]"
                />

                <div className="my-2 flex flex-col">
                    <h2 className="font-medium">{hotel.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>{hotel.hotelAddress}</h2>
                    <h2 className="text-sm">💰 {hotel.price}</h2>
                    <h2 className="text-sm">⭐ {hotel.rating}</h2>
                </div>
            </Link>
        </div>
    )
}

export default HotelCardItems