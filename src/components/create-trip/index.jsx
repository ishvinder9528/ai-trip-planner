import { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../ui/input';
import { AIPrompt, SelectBudgetOptions, SelectTravelesList } from '../../constants/options';
import { Button } from '../ui/button';
import { useToast } from "@/hooks/use-toast"
import { chatSession } from '../../service/AIModal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState();
    const [openDailog, setOpenDailog] = useState(false);
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const navigate = useNavigate()

    const handleInputChnage = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
    }, [formData])

    const validate =
        !formData || !formData.noOfDays || !formData.location || !formData.traveller || !formData.budget;

    const onGeneraterTrip = async () => {

        const user = localStorage.getItem('user')

        if (!user) {
            setOpenDailog(true)
            return;
        }
        setLoading(true)
        if (formData?.noOfDays > 5) {
            toast({
                title: "Oh no! Please enter Trip days less than 5",
                variant: "destructive"
            })
            return;
        }
        const FINAL_PROMT = AIPrompt
            .replace('{location}', formData.location.label)
            .replace('{traveller}', formData.traveller)
            .replace('{budget}', formData.budget)
            .replace('{noOfDays}', formData.noOfDays)

        const result = await chatSession.sendMessage(FINAL_PROMT)
        setLoading(false)
        saveAITrip(result?.response?.text())

    }

    const login = useGoogleLogin({
        onSuccess: credentialResponse => {
            getUserProfilePic(credentialResponse)
        },
        onError: () => {
            console.log('Login Failed');
        },
    })

    const getUserProfilePic = async (token_info) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token_info.access_token}`, {
            headers: {
                'Authorization': 'Bearer ' + token_info.access_token,
                Accept: 'application/json'
            }
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            setOpenDailog(false);
            onGeneraterTrip();
        })
    }

    const saveAITrip = async (tripData) => {
        setLoading(true)
        const docId = Date.now().toString();
        const user = JSON.parse(localStorage.getItem('user'));
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(tripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId);
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-80 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChnage('location', v)
                            }
                        }} />

                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <Input placeholder={'Ex.3'} type='number' min='1'
                        onChange={(e) => handleInputChnage("noOfDays", e.target.value)} />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your Budget</h2>
                    <p>The Budget is exclusively allocated for activities and dining purposes.</p>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index} className={`p-4 border rounded-lg hover: shadow-lg cursor-pointer
                                ${formData?.budget == item.title && 'shadow-lg border-black'}`
                            }
                                onClick={() => handleInputChnage("budget", item.title)}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-grey-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>

                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plam on travel</h2>
                    <div className='grid grid-cols-4 gap-5 mt-5'>
                        {SelectTravelesList.map((item, index) => (
                            <div key={index} className={`p-4 border rounded-lg hover: shadow-lg cursor-pointer
                                 ${formData?.traveller == item.people && 'shadow-lg border-black'
                                } `}
                                onClick={() => handleInputChnage("traveller", item.people)}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-grey-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='my-10 flex justify-end'>
                <Button onClick={onGeneraterTrip} disabled={validate || loading} >
                    {loading ?
                        <>
                            <AiOutlineLoading3Quarters className='animate-spin w-7 h-7' />  <span className="ml-2">Please Wait ~ 1 min</span>
                        </>
                        : 'Generate trip'}</Button>
            </div>

            <Dialog open={openDailog}>

                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src='/logo.svg' />
                            <h2 className='font-bold text-lg mt-7 flex justify-start'>Sign In with Google</h2>
                            <p className='flex justify-start'>Sign in to the App with google authentication securely</p>

                            <Button className='w-full mt-5 flex gap-4 items-center'
                                onClick={login}
                            >
                                <>
                                    <FcGoogle style={{ width: "28px", height: "28px" }} />
                                    Sign In with Google
                                </>
                            </Button>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>



        </div>

    )
}

export default CreateTrip