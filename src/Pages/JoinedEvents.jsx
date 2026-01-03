import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, Tag } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";

const JoinedEvents = () => {
  const { user } = useContext(AuthContext);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      fetchJoinedEvents();
    }
  }, [user]);

  const fetchJoinedEvents = async () => {
    try {
      const resp = await fetch(
        `https://together-now-server.vercel.app/participants/user/${user.email}`
      );
      const participantData = await resp.json();

      const eventIds = participantData.map((x) => x.eventId);

      const eventDetails = await Promise.all(
        eventIds.map(async (id) => {
          const resp2 = await fetch(
            `https://together-now-server.vercel.app/events/${id}`
          );
          if (resp2.ok) {
            return await resp2.json();
          }
          return null;
        })
      );

      const filtered = eventDetails.filter((ev) => ev);
      filtered.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

      setJoinedEvents(filtered);
    } catch (error) {
      console.error("Error fetching joined events:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
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
        <p className="mt-4 text-lg font-semibold">Loading joined events...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          My Joined Events
        </h1>
        <p className="text-accent">
          This page shows all events you have joined, sorted by event date.
        </p>
      </div>

      {joinedEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-accent">
            You haven't joined any events yet!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedEvents.map((event) => (
            <div
              key={event._id}
              className="card bg-neutral shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={
                    event.thumbnail ||
                    "https://via.placeholder.com/400x300?text=Event"
                  }
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <div className="badge badge-primary mb-2">
                  <Tag className="w-3 h-3 mr-1" />
                  {event.eventType}
                </div>
                <h2 className="card-title text-xl font-bold mb-2">
                  {event.title}
                </h2>
                <div className="flex items-center gap-2 text-accent">
                  <MapPin className="w-4 h-4 text-green-700" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-accent mb-4">
                  <Calendar className="w-4 h-4 text-green-700" />
                  <span className="text-sm">{formatDate(event.eventDate)}</span>
                </div>
                <p className="text-sm text-accent mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/event/${event._id}`}
                    className="btn btn-outline btn-primary w-full text-center"
                  >
                    <span>View Event</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;
