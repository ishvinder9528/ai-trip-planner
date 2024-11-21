import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserTripCardItem from "./components/UserTripCardItem";
import { FcDeleteDatabase } from "react-icons/fc";
import { Button } from "../components/ui/button";

const MyTrips = () => {
    const [userTrips, setUserTrips] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getUserTrips();
    }, [])

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/')
            return;
        }
        setUserTrips([])

        const q = query(collection(db, "AITrips"), where('userEmail', '==', user?.email))

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserTrips(prevVal => [...prevVal, doc.data()])
        });

    }
    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-80 px-5 mt-10">

            {userTrips.length != 0 &&
                <h2 className="font-bold text-3xl">My Trips</h2>
            }

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">

                {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                    <div key={index}>
                        <UserTripCardItem trip={trip} className='' />
                    </div>
                )) : userTrips.length == 0 ? (

                    <div className="col-span-full">
                        <div className="flex flex-col items-center my-20">
                            <FcDeleteDatabase className="w-[200px] h-[200px]" />
                            <div className="my-5 flex flex-col items-center gap-2" >
                                <h2 className="text-xl mt-5 font-bold">Sorry, You don&apos;t have any Trip Right Now</h2>
                                <h4 className="text-lg text-gray-500">Click to button to Search Trip first</h4>
                                <Button onClick={() => navigate('/create-trip')} className='h-[60px] w-full mt-6' >Create Trip</Button>

                            </div>
                        </div>
                    </div>
                )
                    : [1, 2, 3, 4, 5, 6].map((trip, index) => (
                        <div key={index} className="h-[300px] w-full bg-slate-200 animate-pulse rounded-xl">
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default MyTrips