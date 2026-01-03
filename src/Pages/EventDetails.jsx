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
    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    if (user && event) {
      checkIfJoined();
    }
  }, [user, event]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(
        `https://together-now-server.vercel.app/events/${id}`
      );

      if (!response.ok) {
        throw new Error("Event not found");
      }

      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
      toast.error("Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  const checkIfJoined = async () => {
    try {
      const response = await fetch(
        `https://together-now-server.vercel.app/participants/check?eventId=${id}&userEmail=${user.email}`
      );
      const data = await response.json();
      setHasJoined(data.hasJoined);
    } catch (error) {
      console.error("Error checking participation:", error);
    }
  };

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error("Please login to join this event");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
      return;
    }

    setJoining(true);

    const participantData = {
      eventId: id,
      eventTitle: event.title,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
    };

    try {
      const response = await fetch(
        "https://together-now-server.vercel.app/participants",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(participantData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setHasJoined(true);
        toast.success("Successfully joined the event!");
      } else {
        toast.error(data.message || "Failed to join event");
      }
    } catch (error) {
      console.error("Error joining event:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Event Not Found
        </h2>
        <button onClick={() => navigate("/upcoming-events")} className="button">
          <span className="button-content">Back to Events</span>
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center cursor-pointer gap-2 mb-6 text-green-700 hover:text-green-900 font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
        <img
          src={
            event.thumbnail || "https://via.placeholder.com/800x400?text=Event"
          }
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            <div className="badge badge-primary mb-2">
              <Tag className="w-3 h-3 mr-1" />
              {event.eventType}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">{event.title}</h1>
          </div>
        </div>
      </div>

      <div className="bg-base-100 shadow-xl rounded-xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-base-300">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-green-700 mt-1" />
            <div>
              <p className="text-xs text-accent">Date & Time</p>
              <p className="font-semibold">{formatDate(event.eventDate)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-green-700 mt-1" />
            <div>
              <p className="text-xs text-accent">Location</p>
              <p className="font-semibold">{event.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-green-700 mt-1" />
            <div>
              <p className="text-xs text-accent">Organized By</p>
              <p className="font-semibold">
                {event.creatorName || "Anonymous"}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About This Event</h2>
          <p className="text-accent leading-relaxed">{event.description}</p>
        </div>

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
              <span className="font-semibold">
                You have already joined this event!
              </span>
            </div>
          ) : (
            <button
              onClick={handleJoinEvent}
              disabled={joining}
              className="btn btn-outline btn-primary w-full md:w-auto md:px-12"
            >
              <span className="">{joining ? "Joining..." : "Join Event"}</span>
            </button>
          )}
        </div>

        {!user && (
          <p className="text-center text-sm text-accent mt-4">
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
