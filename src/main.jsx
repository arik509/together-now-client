import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router"; 
import RootLayout from "./Layouts/RootLayout.jsx";
import Home from "./Pages/Home.jsx";
import UpcomingEvents from "./Pages/UpcomingEvents.jsx";
import EventDetails from "./Pages/EventDetails.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import Login from "./Pages/Login.jsx";
import Registration from "./Pages/Register.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import CreateEvent from "./Pages/CreateEvent.jsx";
import JoinedEvents from "./Pages/JoinedEvents.jsx";
import ManageEvents from "./Pages/ManageEvents.jsx";
import PrivateRoute from "./Context/PrivateRoute.jsx";
import Error from "./Pages/Error.jsx";
import About from "./Components/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element :<Home></Home>
      },
      {
        path: "/upcoming-events",
        element: <UpcomingEvents></UpcomingEvents>,
      },
      {
        path: "/event/:id",
        element: <EventDetails></EventDetails>,
      },
      {
        path: "/create-event",
        element: <PrivateRoute><CreateEvent></CreateEvent></PrivateRoute> ,
      },
      {
        path: "/joined-events",
        element: <PrivateRoute><JoinedEvents></JoinedEvents></PrivateRoute> ,
      },
      {
        path: "/manage-events",
        element: <PrivateRoute><ManageEvents></ManageEvents></PrivateRoute>,
      },
      {
        path: "/about",
        element: <About></About>
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "/*",
    element: <Error></Error>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);