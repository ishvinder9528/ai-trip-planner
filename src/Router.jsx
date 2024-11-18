import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CreateTrip from "./components/create-trip";
import ViewTrip from "./components/view-trip/[tripId]";
import MyTrips from "./my-trips";
export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/home",
        element: <App />,
    },
    {
        path: "/create-trip",
        element: <CreateTrip/>
    },
    {
        path:"/view-trip/:tripId",
        element: <ViewTrip/>
    },
    {
        path:"/my-trips/",
        element: <MyTrips/>
    }
]);
