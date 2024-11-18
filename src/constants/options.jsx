export const SelectTravelesList = [{
    id: 1,
    title: 'Just Me',
    desc: 'A solo traveles in exploration',
    icon: '✈︎',
    people: '1'
},
{
    id: 2,
    title: 'Couple',
    desc: "Two Traveles in tandem",
    icon: '🥂',
    people: '2'
}, {
    id: 3,
    title: 'Family',
    desc: 'A group of fun Loving adv',
    icon: "🏡",
    people: '3 to 5'
},
{
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seeks',
    icon: "🏝️",
    people: '5 to 10'
}]

export const SelectBudgetOptions = [{
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: "💵"
},
{
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: "💰"
},
{
    id: 3,
    title: 'luxury',
    desc: 'Dont worry about cost',
    icon: "💸"
}]

export const AIPrompt='Generate Travel Plan for Location with real locations and real world things: {location}, for {noOfDays} Days for {traveller} people with a {budget} budget, Give me a Hotels options list (min. 4 hotels) with HotelName, Hotel address, Price (ex. Rs. 1500-2000 per day), hotel image url, geo coordinates, rating (ex. 1 star), descriptions and suggest itinerary with day (ex. "day": "day1" like:-   "itinerary": [{"day": "Day1","places": [{"placeName": "Eiffel Tower",...., min. 3 and max.5) and placeName, Place Details(min. 20 words), Place Image Url, Geo Coordinates, Place Address, tickets, Pricing, rating, Time (ex. time:"9:00 AM - 12:00 PM"), time to travel (ex. "timeToTravel":30 minutes from ...),each of the location each day plan with best time to visit in JSON format.'