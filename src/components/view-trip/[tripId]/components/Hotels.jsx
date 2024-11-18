import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HotelCardItems from "./HotelCardItems";

const Hotels = ({ trip }) => {

    useEffect(() => {

    }, [trip]);

    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItems hotel={hotel} key={index}/>
                 
                ))}
            </div>
        </div>
    );
};

export default Hotels;
