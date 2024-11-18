import { useEffect, useState } from "react"
import { useNavigation } from "react-router-dom"
import { db } from "../service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {
    const [userTrips, setUserTrips] = useState([])
    const navigation = useNavigation();
    useEffect(() => {
        getUserTrips()
    }, [])

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/')
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
            <h2 className="font-bold text-3xl">My Trips</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">

                {userTrips?.length>0 ?userTrips.map((trip, index) => (
                    <div key={index}>
                        <UserTripCardItem trip={trip} className='' />
                    </div>
                )):[1,2,3,4,5,6].map((trip, index) => (
                    <div key={index} className="h-[300px] w-full bg-slate-200 animate-pulse rounded-xl">

                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyTrips