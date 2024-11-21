import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserTripCardItem from "./components/UserTripCardItem";
import { FcDeleteDatabase } from "react-icons/fc";
import { Button } from "../components/ui/button";

const MyTrips = () => {
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state
    const navigate = useNavigate();

    useEffect(() => {
        getUserTrips();
    }, []);

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
            return;
        }

        const q = query(collection(db, "AITrips"), where('userEmail', '==', user?.email));
        
        const querySnapshot = await getDocs(q);
        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push(doc.data());
        });

        setUserTrips(trips); // Set the fetched trips
        setLoading(false); // Set loading to false after fetching
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-80 px-5 mt-10">
            {userTrips.length !== 0 && !loading && (
                <h2 className="font-bold text-3xl">My Trips</h2>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
                {loading ? (
                    // Show loading skeletons while trips are being fetched
                    [1, 2, 3, 4, 5, 6].map((trip, index) => (
                        <div key={index} className="h-[300px] w-full bg-slate-200 animate-pulse rounded-xl">
                        </div>
                    ))
                ) : userTrips?.length > 0 ? (
                    // Show actual trip items when trips are fetched
                    userTrips.map((trip, index) => (
                        <div key={index}>
                            <UserTripCardItem trip={trip} className='' />
                        </div>
                    ))
                ) : (
                    // Show "No trips" message if no trips found
                    <div className="col-span-full">
                        <div className="flex flex-col items-center my-20">
                            <FcDeleteDatabase className="w-[200px] h-[200px]" />
                            <div className="my-5 flex flex-col items-center gap-2">
                                <h2 className="text-xl mt-5 font-bold">Sorry, You don&apos;t have any Trip Right Now</h2>
                                <h4 className="text-lg text-gray-500">Click the button to create a trip</h4>
                                <Button onClick={() => navigate('/create-trip')} className='h-[60px] w-full mt-6'>
                                    Create Trip
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTrips;
