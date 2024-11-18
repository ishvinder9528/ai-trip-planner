import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'

const Header = () => {
  const [openDailog, setOpenDailog] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
  }, [])

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
      window.location.reload();
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5' >
      <a href='/'>
        <img className='hover:cursor-pointer h-[40px]' src='/logo.svg'></img>
      </a>

      <div>
        {
          user ?
            <div className='flex gap-5 items-center'>
              <a href='/create-trip'>
                <Button className='rounded-full'
                  variant='outline'>+ Create Trip</Button>
              </a>
              <a href='/my-trips'>
                <Button className='rounded-full'
                  variant='outline'>My Trips</Button>
              </a>


              <Popover>
                <PopoverTrigger>
                  <img src={user.picture} className='h-[35px] w-[35px] rounded-full' />
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>


            </div>
            :
            <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
        }
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

export default Header