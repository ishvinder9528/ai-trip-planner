import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../../service/firebaseConfig"
import { useToast } from "@/hooks/use-toast"
import InfoSection from "./components/infoSection"
import Hotels from "./components/hotels"
import PlacesToVisit from "./components/PlacesToVisit"
import Footer from "./components/Footer"

const ViewTrip = () => {
    const { tripId } = useParams()
    const { toast } = useToast();
    const [trip, setTrip] = useState()
    useEffect(() => {
        getTripData()
    }, [tripId])

    const getTripData = async () => {
        const docRef = doc(db, "AITrips", tripId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document exists:", docSnap?.data());
            setTrip(docSnap.data())
        } else {
            console.log("Document not found:", docRef);
            toast({
                title: 'No Trip Found'
            })
        }
    }
    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recomended Hotels */}
            <Hotels trip={trip} />
            {/* Daily Plan */}
            <PlacesToVisit trip={trip}/>
            {/* Footer */}
            <Footer trip={trip}/>
        </div>
    )
}

export default ViewTrip  