import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, Tag, Search, X } from "lucide-react";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const EVENT_TYPES = [
    "All",
    "Cleanup",
    "Plantation",
    "Donation",
    "Awareness",
    "Workshop",
  ];

  useEffect(() => {
    fetchUpcomingEvents();
  }, [filter, searchQuery]);

  const fetchUpcomingEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filter !== "All") {
        params.append("eventType", filter);
      }

      if (searchQuery.trim() !== "") {
        params.append("search", searchQuery);
      }

      const url = `https://together-now-server.vercel.app/upcoming-events${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
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
        <p className="mt-4 text-lg font-semibold">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          Upcoming Events
        </h1>
        <p className="text-accent">
          Join us in making a difference in our community
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search events by title, description, or location..."
            className="input input-bordered w-full pr-20 pl-12"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary btn-sm"
          >
            Search
          </button>
        </form>

        {searchQuery && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Searching for:{" "}
            <span className="font-semibold">"{searchQuery}"</span>
            <button
              onClick={handleClearSearch}
              className="ml-2 text-green-700 cursor-pointer hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {EVENT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all ${
              filter === type
                ? "bg-green-700 text-white shadow-lg"
                : "bg-base-200 hover:bg-green-100 dark:hover:bg-green-900"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {(filter !== "All" || searchQuery) && (
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Active filters:
          </span>
          {filter !== "All" && (
            <span className="badge badge-primary gap-2">
              Type: {filter}
              <button onClick={() => setFilter("All")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="badge badge-secondary gap-2">
              Search: {searchQuery}
              <button onClick={handleClearSearch}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            No events found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {searchQuery || filter !== "All"
              ? "Try adjusting your search or filters"
              : "No upcoming events at the moment"}
          </p>
          {(searchQuery || filter !== "All") && (
            <button
              onClick={() => {
                setFilter("All");
                handleClearSearch();
              }}
              className="btn btn-primary btn-sm mt-4"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="text-center my-4 text-2xl text-gray-600 dark:text-gray-400">
            Found {events.length} event{events.length !== 1 ? "s" : ""}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
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
                  <div className="badge badge-dash mb-2">
                    <Tag className="w-3 text-accent h-3 mr-1" />
                    <p className="text-accent">{event.eventType}</p>
                  </div>

                  <h2 className="card-title text-xl font-bold mb-2">
                    {event.title}
                  </h2>

                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-green-700" />
                    <span className="text-sm">{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-green-700" />
                    <span className="text-sm">
                      {formatDate(event.eventDate)}
                    </span>
                  </div>

                  <p className="text-sm mb-4 line-clamp-2">
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
        </>
      )}
    </div>
  );
};

export default UpcomingEvents;
