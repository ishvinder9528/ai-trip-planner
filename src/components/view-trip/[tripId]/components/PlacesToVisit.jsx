import PlaceCardItems from "./PlaceCardItems"

const PlacesToVisit = ({ trip }) => {
    return (
        <div>
            <h2 className="font-bold text-lg">Places to Visit</h2>

            <div>
                {trip?.tripData?.itinerary.map((item, index) => (
                    <div key={index}>
                        <h2 className="font-bold text-lg">{item.day}</h2>
                        
                        <div className="grid md:grid-cols-2 gap-5">
                            {item?.places.map((place, index) => (

                                <div key={index} className="">
                                    <h2 className="font-medium text-xs md:text-sm text-orange-500">{place.time}</h2>
                                    <div>
                                        <PlaceCardItems place={place} />
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit