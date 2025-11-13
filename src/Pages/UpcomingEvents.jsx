import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, Tag } from "lucide-react";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const EVENT_TYPES = ["All", "Cleanup", "Plantation", "Donation", "Awareness", "Workshop"];

  useEffect(() => {
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: "Beach Cleanup Drive",
          description: "Join us for a community beach cleanup event",
          eventType: "Cleanup",
          thumbnail: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500",
          location: "Cox's Bazar Beach",
          eventDate: "2025-11-20T10:00:00",
          creatorEmail: "user@example.com",
        },
        {
          id: 2,
          title: "Tree Plantation Campaign",
          description: "Plant trees and make our city greener",
          eventType: "Plantation",
          thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500",
          location: "Ramna Park, Dhaka",
          eventDate: "2025-11-25T08:00:00",
          creatorEmail: "admin@example.com",
        },
        {
          id: 3,
          title: "Winter Clothes Donation",
          description: "Donate warm clothes for the underprivileged",
          eventType: "Donation",
          thumbnail: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500",
          location: "Community Center, Mirpur",
          eventDate: "2025-12-01T09:00:00",
          creatorEmail: "donor@example.com",
        },
        {
          id: 4,
          title: "Environmental Awareness Workshop",
          description: "Learn about climate change and sustainability",
          eventType: "Workshop",
          thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
          location: "BUET Auditorium",
          eventDate: "2025-12-05T14:00:00",
          creatorEmail: "workshop@example.com",
        },
      ];

      const today = new Date();
      const upcomingEvents = mockEvents.filter(
        (event) => new Date(event.eventDate) >= today
      );

      setEvents(upcomingEvents);
      setLoading(false);
    }, 1000);
  }, []);

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
              key={event.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              
              <figure className="h-48 overflow-hidden">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </figure>

              <div className="card-body">
                
                <div className="badge badge-secondary mb-2">
                  <Tag className="w-3 h-3 mr-1" />
                  {event.eventType}
                </div>

                
                <h2 className="card-title text-xl font-bold mb-2">
                  {event.title}
                </h2>

                
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 text-green-700" />
                  <span className="text-sm">{event.location}</span>
                </div>

                
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                  <Calendar className="w-4 h-4 text-green-700" />
                  <span className="text-sm">{formatDate(event.eventDate)}</span>
                </div>

                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {event.description}
                </p>

                
                <div className="card-actions justify-end">
                  <Link
                    to={`/event/${event.id}`}
                    className="button w-full text-center"
                  >
                    <span className="button-content">View Event</span>
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