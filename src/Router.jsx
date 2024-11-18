import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CreateTrip from "./components/create-trip";
import ViewTrip from "./components/view-trip/[tripId]";
export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/create-trip",
        element: <CreateTrip/>
    },
    {
        path:"/view-trip/:tripId",
        element: <ViewTrip/>
    }
]);
