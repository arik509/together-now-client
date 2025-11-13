import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, Tag } from "lucide-react";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const EVENT_TYPES = ["All", "Cleanup", "Plantation", "Donation", "Awareness", "Workshop"];

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/upcoming-events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = filter === "All" 
    ? events 
    : events.filter(event => event.eventType === filter);

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
        <p className="mt-4 text-lg font-semibold">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2">Upcoming Events</h1>
        <p className="text-accent">
          Join us in making a difference in our community
        </p>
      </div>

      
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {EVENT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              filter === type
                ? "bg-green-700 text-white shadow-lg"
                : "bg-base-200 hover:bg-green-100 dark:hover:bg-green-900"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No upcoming events found for "{filter}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="card bg-neutral shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              
              <figure className="h-48 overflow-hidden">
                <img
                  src={event.thumbnail || "https://via.placeholder.com/400x300?text=Event"}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </figure>

              <div className="card-body">
                
                <div className="badge badge-dash mb-2">
                  <Tag className="w-3 text-accent h-3 mr-1" />
                  <p className="text-accent">{event.eventType}</p>
                </div>

                <h2 className="card-title text-xl font-bold mb-2">
                  {event.title}
                </h2>

                <div className="flex items-center gap-2  mb-2">
                  <MapPin className="w-4 h-4 text-green-700" />
                  <span className="text-sm">{event.location}</span>
                </div>

               
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-green-700" />
                  <span className="text-sm">{formatDate(event.eventDate)}</span>
                </div>

                
                <p className="text-sm  mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="card-actions justify-end">
                  <Link
                    to={`/event/${event._id}`}
                    className="btn btn-outline btn-primary w-full text-center"
                  >
                    <span className="">View Event</span>
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

export default UpcomingEvents;