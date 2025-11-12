import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./Layouts/RootLayout.jsx";
import Home from "./Pages/Home.jsx";
import UpcomingEvents from "./Pages/UpcomingEvents.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import Login from "./Pages/Login.jsx";
import Registration from "./Pages/Registration.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/upcoming-events',
        Component: UpcomingEvents
      }
    ]
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
        element: <Registration></Registration>
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
