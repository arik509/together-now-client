import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import { Calendar, MapPin, Tag, Pencil, Trash2, Plus } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Awareness",
  "Workshop",
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  
  // Create Event States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [thumbnail, setThumbnail] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manage Events States
  const [myEvents, setMyEvents] = useState([]);
  const [manageLoading, setManageLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({});
  const [updating, setUpdating] = useState(false);

  // Joined Events States
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [joinedLoading, setJoinedLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "manage" && user && user.email) {
      fetchMyEvents();
    }
    if (activeTab === "joined" && user && user.email) {
      fetchJoinedEvents();
    }
  }, [activeTab, user]);

  // Create Event Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventDate) {
      toast.error("Please select a valid event date.");
      return;
    }

    setLoading(true);

    const eventData = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate: eventDate.toISOString(),
      creatorEmail: user?.email || "unknown",
      creatorName: user?.displayName || "Anonymous",
    };

    try {
      const response = await fetch(
        "https://together-now-server.vercel.app/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        toast.success("Event created successfully!");
        setTitle("");
        setDescription("");
        setEventType(EVENT_TYPES[0]);
        setThumbnail("");
        setLocation("");
        setEventDate(null);
      } else {
        toast.error("Failed to create event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch My Events
  const fetchMyEvents = async () => {
    setManageLoading(true);
    try {
      const resp = await fetch(
        `https://together-now-server.vercel.app/events?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = await resp.json();
      data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      setMyEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load your events.");
    } finally {
      setManageLoading(false);
    }
  };

  // Fetch Joined Events
  const fetchJoinedEvents = async () => {
    setJoinedLoading(true);
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
      setJoinedLoading(false);
    }
  };

  // Manage Events Handlers
  const handleEditClick = (event) => {
    setEditingEvent(event._id);
    setForm({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      location: event.location,
      eventDate: event.eventDate,
      thumbnail: event.thumbnail,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateEvent = async (eventId) => {
    setUpdating(true);
    try {
      const resp = await fetch(
        `https://together-now-server.vercel.app/events/${eventId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (resp.ok) {
        toast.success("Event updated successfully!");
        setEditingEvent(null);
        fetchMyEvents();
      } else {
        toast.error("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Update failed.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resp = await fetch(
            `https://together-now-server.vercel.app/events/${eventId}`,
            {
              method: "DELETE",
            }
          );
          if (resp.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your event has been deleted.",
              icon: "success",
            });
            fetchMyEvents();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete event.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting event:", error);
          Swal.fire({
            title: "Error!",
            text: "Deletion failed.",
            icon: "error",
          });
        }
      }
    });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const today = new Date();

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4 text-center text-red-600 font-semibold">
        You must be logged in to access the dashboard.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
        My Dashboard
      </h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="tabs tabs-boxed bg-base-200">
          <button
            className={`tab tab-lg ${
              activeTab === "create" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("create")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </button>
          <button
            className={`tab tab-lg ${
              activeTab === "manage" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("manage")}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Manage Events
          </button>
          <button
            className={`tab tab-lg ${
              activeTab === "joined" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("joined")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Joined Events
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto">
        {/* Create Event Tab */}
        {activeTab === "create" && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-green-700">
              Create New Event
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-base-200 p-6 rounded shadow-md"
            >
              <div>
                <label className="block mb-1 font-semibold" htmlFor="title">
                  Event Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label
                  className="block mb-1 font-semibold"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="Describe your event"
                ></textarea>
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="eventType">
                  Event Type
                </label>
                <select
                  id="eventType"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="select select-bordered w-full"
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="thumbnail">
                  Thumbnail Image URL
                </label>
                <input
                  id="thumbnail"
                  type="url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter event location"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="eventDate">
                  Event Date
                </label>
                <DatePicker
                  id="eventDate"
                  selected={eventDate}
                  onChange={(date) => setEventDate(date)}
                  minDate={today}
                  placeholderText="Select a future date"
                  className="input input-bordered w-full"
                  dateFormat="MMMM d, yyyy"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
            </form>
          </div>
        )}

        {/* Manage Events Tab */}
        {activeTab === "manage" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
              Manage My Events
            </h2>
            {manageLoading ? (
              <div className="text-center py-12">
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-100"></div>
                  <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-200"></div>
                </div>
                <p className="mt-4 text-lg font-semibold">
                  Loading your events...
                </p>
              </div>
            ) : myEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  You haven't created any events yet!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEvents.map((event) => (
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
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="w-4 h-4 text-green-700" />
                        <span className="text-sm text-accent">
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                        <Calendar className="w-4 h-4 text-green-700" />
                        <span className="text-sm text-accent">
                          {formatDate(event.eventDate)}
                        </span>
                      </div>
                      <p className="text-sm text-accent mb-2 line-clamp-2">
                        {event.description}
                      </p>

                      {editingEvent === event._id ? (
                        <form
                          className="mt-2 space-y-2"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateEvent(event._id);
                          }}
                        >
                          <input
                            name="title"
                            type="text"
                            className="input input-bordered w-full mb-1"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Title"
                          />
                          <textarea
                            name="description"
                            className="textarea textarea-bordered w-full mb-1"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                          />
                          <input
                            name="eventType"
                            type="text"
                            className="input input-bordered w-full mb-1"
                            value={form.eventType}
                            onChange={handleChange}
                            placeholder="Event Type"
                            readOnly
                          />
                          <input
                            name="location"
                            type="text"
                            className="input input-bordered w-full mb-1"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Location"
                          />
                          <input
                            name="eventDate"
                            type="datetime-local"
                            className="input input-bordered w-full mb-1"
                            value={form.eventDate?.slice(0, 16)}
                            onChange={handleChange}
                          />
                          <input
                            name="thumbnail"
                            type="text"
                            className="input input-bordered w-full mb-1"
                            value={form.thumbnail}
                            onChange={handleChange}
                            placeholder="Thumbnail URL"
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              type="submit"
                              disabled={updating}
                              className="btn btn-outline"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline"
                              onClick={() => setEditingEvent(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex gap-3 mt-4 items-center justify-center">
                          <button
                            className="btn btn-outline btn-circle btn-primary flex items-center gap-1"
                            onClick={() => handleEditClick(event)}
                          >
                            <Pencil className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => handleDeleteEvent(event._id)}
                            className="d-button ml-10"
                          >
                            <svg viewBox="0 0 448 512" className="svgIcon">
                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                            </svg>
                          </button>
                        </div>
                      )}
                      <div className="card-actions justify-end mt-2">
                        <Link
                          to={`/event/${event._id}`}
                          className="btn btn-primary w-full text-center"
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
        )}

        {/* Joined Events Tab */}
        {activeTab === "joined" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
              My Joined Events
            </h2>
            {joinedLoading ? (
              <div className="text-center py-12">
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-100"></div>
                  <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-200"></div>
                </div>
                <p className="mt-4 text-lg font-semibold">
                  Loading joined events...
                </p>
              </div>
            ) : joinedEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">
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
                        <span className="text-sm">
                          {formatDate(event.eventDate)}
                        </span>
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
        )}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Dashboard;
