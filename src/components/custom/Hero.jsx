import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1
                className='font-extrabold text-[50px] text-center mt-16'>
                <span className='text-[#f56551]'>Discover Your Next Advemture with AI:</span> Personalized Itineraries at Your Fingertips</h1>
            <p className='text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>

            <Link to={'/create-trip'}>
                <Button> Get Started, It&#39;s Free</Button>
            </Link>

            <img src='/landing.jpg' className='mt-20 h-[800px] my-10'/>
        </div>
    )
}

export default Hero