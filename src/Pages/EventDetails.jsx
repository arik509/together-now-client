import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { Calendar, MapPin, Tag, User, ArrowLeft } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    // Simulate fetching event details from API
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: "Beach Cleanup Drive",
          description: "Join us for a community beach cleanup event. We will be cleaning the beautiful Cox's Bazar beach and making it cleaner for everyone. Bring your friends and family to make this event a success. All necessary equipment will be provided. Let's work together to keep our beaches clean and beautiful.",
          eventType: "Cleanup",
          thumbnail: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800",
          location: "Cox's Bazar Beach",
          eventDate: "2025-11-20T10:00:00",
          creatorEmail: "user@example.com",
          creatorName: "John Doe",
        },
        {
          id: 2,
          title: "Tree Plantation Campaign",
          description: "Plant trees and make our city greener. This is a great opportunity to contribute to our environment. We aim to plant 1000+ trees in various locations across Ramna Park. Join us in this noble cause and help make Dhaka a greener city.",
          eventType: "Plantation",
          thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
          location: "Ramna Park, Dhaka",
          eventDate: "2025-11-25T08:00:00",
          creatorEmail: "admin@example.com",
          creatorName: "Admin Team",
        },
        {
          id: 3,
          title: "Winter Clothes Donation",
          description: "Donate warm clothes for the underprivileged. Winter is coming and many people don't have warm clothes. Your contribution can make someone's winter warm and comfortable. All types of winter clothing are welcome.",
          eventType: "Donation",
          thumbnail: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800",
          location: "Community Center, Mirpur",
          eventDate: "2025-12-01T09:00:00",
          creatorEmail: "donor@example.com",
          creatorName: "Sarah Ahmed",
        },
        {
          id: 4,
          title: "Environmental Awareness Workshop",
          description: "Learn about climate change and sustainability. This workshop will cover important topics related to environmental conservation, climate change impacts, and what we can do as individuals to make a difference. Expert speakers will share their knowledge and experience.",
          eventType: "Workshop",
          thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
          location: "BUET Auditorium",
          eventDate: "2025-12-05T14:00:00",
          creatorEmail: "workshop@example.com",
          creatorName: "Environmental Club",
        },
      ];

      const foundEvent = mockEvents.find((e) => e.id === parseInt(id));
      setEvent(foundEvent);
      setLoading(false);

      // Check if user has already joined (simulate API call)
      if (user && foundEvent) {
        // In real app, check from database
        const joinedEvents = JSON.parse(localStorage.getItem("joinedEvents") || "[]");
        const alreadyJoined = joinedEvents.some(
          (je) => je.eventId === foundEvent.id && je.userEmail === user.email
        );
        setHasJoined(alreadyJoined);
      }
    }, 800);
  }, [id, user]);

  const handleJoinEvent = () => {
    if (!user) {
      toast.error("Please login to join this event");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
      return;
    }

    setJoining(true);

    // Simulate API call to join event
    setTimeout(() => {
      const joinData = {
        eventId: event.id,
        eventTitle: event.title,
        userEmail: user.email,
        userName: user.displayName || "Anonymous",
        joinedAt: new Date().toISOString(),
      };

      // Store in localStorage (in real app, send to backend)
      const joinedEvents = JSON.parse(localStorage.getItem("joinedEvents") || "[]");
      joinedEvents.push(joinData);
      localStorage.setItem("joinedEvents", JSON.stringify(joinedEvents));

      setHasJoined(true);
      setJoining(false);
      toast.success("Successfully joined the event!");
    }, 1000);
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: "long",
      year: "numeric", 
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-200"></div>
        </div>
        <p className="mt-4 text-lg font-semibold">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Event Not Found</h2>
        <button
          onClick={() => navigate("/upcoming-events")}
          className="button"
        >
          <span className="button-content">Back to Events</span>
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-green-700 hover:text-green-900 font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Event Banner */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            <div className="badge badge-secondary mb-2">
              <Tag className="w-3 h-3 mr-1" />
              {event.eventType}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Event Details Card */}
      <div className="bg-base-100 shadow-xl rounded-xl p-6 md:p-8">
        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-base-300">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-green-700 mt-1" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Date & Time</p>
              <p className="font-semibold">{formatDate(event.eventDate)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-green-700 mt-1" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
              <p className="font-semibold">{event.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-green-700 mt-1" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Organized By</p>
              <p className="font-semibold">{event.creatorName}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About This Event</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Join Button */}
        <div className="flex justify-center">
          {hasJoined ? (
            <div className="alert alert-success w-full md:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">You have already joined this event!</span>
            </div>
          ) : (
            <button
              onClick={handleJoinEvent}
              disabled={joining}
              className="button w-full md:w-auto md:px-12"
            >
              <span className="button-content">
                {joining ? "Joining..." : "Join Event"}
              </span>
            </button>
          )}
        </div>

        {!user && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Please{" "}
            <span
              onClick={() => navigate("/auth/login")}
              className="text-green-700 font-semibold cursor-pointer hover:underline"
            >
              login
            </span>{" "}
            to join this event
          </p>
        )}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default EventDetails;