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
import Dashboard from "./Pages/Dashboard.jsx";
import PrivateRoute from "./Context/PrivateRoute.jsx";
import Error from "./Pages/Error.jsx";
import About from "./Components/About.jsx";
import Profile from "./Pages/Profile.jsx";
import Blog from "./Pages/Blog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
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
        path: "/blog",
        Component: Blog
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
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
