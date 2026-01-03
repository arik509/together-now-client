import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Calendar,
  MapPin,
  Tag,
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-asc");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12;

  const EVENT_TYPES = [
    "All",
    "Cleanup",
    "Plantation",
    "Donation",
    "Awareness",
    "Workshop",
  ];

  const LOCATIONS = [
    "All",
    "Dhaka",
    "Chittagong",
    "Khulna",
    "Rangamati",
    "Cox's Bazar",
  ];

  const SORT_OPTIONS = [
    { value: "date-asc", label: "Date (Earliest First)" },
    { value: "date-desc", label: "Date (Latest First)" },
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
  ];

  useEffect(() => {
    fetchUpcomingEvents();
  }, [filter, searchQuery, locationFilter, sortBy]);

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
      let data = await response.json();

      // Apply location filter (client-side)
      if (locationFilter !== "All") {
        data = data.filter((event) =>
          event.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
      }

      // Apply sorting
      data = sortEvents(data, sortBy);

      setEvents(data);
      setCurrentPage(1); // Reset to first page when filters change
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortEvents = (eventArray, sortOption) => {
    const sorted = [...eventArray];

    switch (sortOption) {
      case "date-asc":
        return sorted.sort(
          (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
        );
      case "date-desc":
        return sorted.sort(
          (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
        );
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
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

  const handleClearAllFilters = () => {
    setFilter("All");
    setLocationFilter("All");
    setSearchInput("");
    setSearchQuery("");
    setSortBy("date-asc");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="card bg-neutral shadow-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-base-300"></div>
      <div className="card-body">
        <div className="h-6 bg-base-300 rounded w-20 mb-2"></div>
        <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-full mb-4"></div>
        <div className="h-10 bg-base-300 rounded"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            Upcoming Events
          </h1>
          <p className="text-accent">
            Join us in making a difference in our community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  const activeFiltersCount =
    (filter !== "All" ? 1 : 0) +
    (locationFilter !== "All" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="w-11/12 mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          Upcoming Events
        </h1>
        <p className="text-accent">
          Join us in making a difference in our community
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search events by title, description, or location..."
            className="input input-bordered w-full pr-20 pl-12 border-2 focus:border-green-500"
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
      </div>

      {/* Filters Toggle Button (Mobile) */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline btn-sm gap-2 lg:hidden"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-accent hidden sm:block">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters Section */}
      <div
        className={`mb-8 ${
          showFilters ? "block" : "hidden"
        } lg:block space-y-6`}
      >
        {/* Event Type Filter */}
        <div>
          <h3 className="text-sm font-bold mb-3 text-accent flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Event Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                  filter === type
                    ? "bg-green-700 text-white shadow-lg"
                    : "bg-base-200 hover:bg-green-100 dark:hover:bg-green-900"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <h3 className="text-sm font-bold mb-3 text-accent flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </h3>
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((location) => (
              <button
                key={location}
                onClick={() => setLocationFilter(location)}
                className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                  locationFilter === location
                    ? "bg-green-700 text-white shadow-lg"
                    : "bg-base-200 hover:bg-green-100 dark:hover:bg-green-900"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center mb-6 p-4 bg-base-200 rounded-lg">
          <span className="text-sm font-semibold text-accent">
            Active filters:
          </span>
          {filter !== "All" && (
            <span className="badge badge-lg gap-2 bg-green-700 text-white border-none">
              Type: {filter}
              <button onClick={() => setFilter("All")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {locationFilter !== "All" && (
            <span className="badge badge-lg gap-2 bg-green-700 text-white border-none">
              Location: {locationFilter}
              <button onClick={() => setLocationFilter("All")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="badge badge-lg gap-2 bg-green-700 text-white border-none">
              Search: "{searchQuery}"
              <button onClick={handleClearSearch}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={handleClearAllFilters}
            className="btn btn-sm btn-ghost text-green-700 hover:bg-green-100"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-accent">
          {events.length === 0
            ? "No events found"
            : `Showing ${indexOfFirstEvent + 1}-${Math.min(
                indexOfLastEvent,
                events.length
              )} of ${events.length} event${events.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* No Results */}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-accent mb-2">No events found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Try adjusting your search or filters
          </p>
          <button onClick={handleClearAllFilters} className="btn btn-primary">
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          {/* Event Cards Grid - 4 per row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentEvents.map((event) => (
              <div
                key={event._id}
                className="card bg-neutral shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border-2 border-transparent hover:border-green-500"
              >
                {/* Image - Fixed Height */}
                <figure className="h-48 overflow-hidden shrink-0">
                  <img
                    src={
                      event.thumbnail ||
                      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"
                    }
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </figure>

                {/* Card Body */}
                <div className="card-body grow flex flex-col p-4">
                  {/* Event Type Badge */}
                  <div className="badge badge-outline border-green-700 text-green-700 mb-2">
                    <Tag className="w-3 h-3 mr-1" />
                    {event.eventType}
                  </div>

                  {/* Title */}
                  <h2 className="card-title text-lg font-bold mb-2 line-clamp-2">
                    {event.title}
                  </h2>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-700 shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-700 shrink-0" />
                      <span className="line-clamp-1">
                        {formatDate(event.eventDate)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-accent line-clamp-2 mb-4 grow">
                    {event.description}
                  </p>

                  {/* View Details Button */}
                  <div className="card-actions mt-auto">
                    <Link
                      to={`/event/${event._id}`}
                      className="btn btn-primary w-full btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`btn btn-sm ${
                          currentPage === pageNumber
                            ? "btn-primary"
                            : "btn-outline"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span
                        key={pageNumber}
                        className="btn btn-sm btn-disabled"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UpcomingEvents;
