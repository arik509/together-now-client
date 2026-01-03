import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import {
  Calendar,
  MapPin,
  Tag,
  Pencil,
  Trash2,
  Plus,
  Users,
  FileEdit,
  Menu,
  X,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
} from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Overview Stats
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalJoined: 0,
    upcomingEvents: 0,
    totalParticipants: 0,
  });
  const [chartData, setChartData] = useState({
    byType: {},
    byMonth: {},
  });
  const [recentEvents, setRecentEvents] = useState([]);

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
    if (user && user.email) {
      if (activeTab === "overview") {
        fetchDashboardData();
      } else if (activeTab === "manage") {
        fetchMyEvents();
      } else if (activeTab === "joined") {
        fetchJoinedEvents();
      }
    }
  }, [activeTab, user]);

  // Fetch Dashboard Overview Data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch user's events
      const myEventsResp = await fetch(
        `https://together-now-server.vercel.app/events?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const myEventsData = await myEventsResp.json();

      // Fetch joined events
      const joinedResp = await fetch(
        `https://together-now-server.vercel.app/participants/user/${user.email}`
      );
      const joinedData = await joinedResp.json();

      // Fetch all upcoming events
      const upcomingResp = await fetch(
        `https://together-now-server.vercel.app/upcoming-events`
      );
      const upcomingData = await upcomingResp.json();

      // Calculate stats
      const now = new Date();
      const upcomingMyEvents = myEventsData.filter(
        (e) => new Date(e.eventDate) > now
      );

      // Count participants across all user's events
      let totalParticipants = 0;
      for (const event of myEventsData) {
        const participantsResp = await fetch(
          `https://together-now-server.vercel.app/participants/event/${event._id}`
        );
        const participants = await participantsResp.json();
        totalParticipants += participants.length;
      }

      setStats({
        totalEvents: myEventsData.length,
        totalJoined: joinedData.length,
        upcomingEvents: upcomingMyEvents.length,
        totalParticipants: totalParticipants,
      });

      // Chart data - Events by Type
      const typeCount = {};
      EVENT_TYPES.forEach((type) => {
        typeCount[type] = myEventsData.filter(
          (e) => e.eventType === type
        ).length;
      });
      setChartData((prev) => ({ ...prev, byType: typeCount }));

      // Chart data - Events by Month
      const monthCount = {};
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      myEventsData.forEach((event) => {
        const month = monthNames[new Date(event.eventDate).getMonth()];
        monthCount[month] = (monthCount[month] || 0) + 1;
      });
      setChartData((prev) => ({ ...prev, byMonth: monthCount }));

      // Recent events (last 5)
      const sorted = [...myEventsData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentEvents(sorted.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="flex min-h-screen bg-base-200">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-green-700 text-white rounded-md shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-base-100 shadow-xl z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        <div className="p-6 border-b border-green-700">
          <h2 className="text-2xl font-bold text-green-700">Dashboard</h2>
          <p className="text-sm text-accent mt-1">
            {user?.displayName || "User"}
          </p>
        </div>

        <nav className="p-4">
          <ul className="menu menu-compact flex flex-col gap-2">
            <li>
              <button
                onClick={() => {
                  setActiveTab("overview");
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  activeTab === "overview"
                    ? "bg-green-700 text-white font-semibold"
                    : "hover:bg-base-200"
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("create");
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  activeTab === "create"
                    ? "bg-green-700 text-white font-semibold"
                    : "hover:bg-base-200"
                }`}
              >
                <Plus className="w-5 h-5" />
                <span>Create Event</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("manage");
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  activeTab === "manage"
                    ? "bg-green-700 text-white font-semibold"
                    : "hover:bg-base-200"
                }`}
              >
                <FileEdit className="w-5 h-5" />
                <span>Manage Events</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("joined");
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  activeTab === "joined"
                    ? "bg-green-700 text-white font-semibold"
                    : "hover:bg-base-200"
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Joined Events</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="User"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-accent truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Activity className="w-8 h-8 text-green-700" />
                <h1 className="text-3xl font-bold text-green-700">
                  Dashboard Overview
                </h1>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-100"></div>
                    <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <p className="mt-4 text-lg font-semibold">
                    Loading dashboard...
                  </p>
                </div>
              ) : (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Events Created */}
                    <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-3 rounded-lg">
                          <Calendar className="w-8 h-8" />
                        </div>
                        <TrendingUp className="w-6 h-6 opacity-75" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">
                        {stats.totalEvents}
                      </h3>
                      <p className="text-green-50 text-sm">Events Created</p>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-3 rounded-lg">
                          <Activity className="w-8 h-8" />
                        </div>
                        <TrendingUp className="w-6 h-6 opacity-75" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">
                        {stats.upcomingEvents}
                      </h3>
                      <p className="text-blue-50 text-sm">Upcoming Events</p>
                    </div>

                    {/* Events Joined */}
                    <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-3 rounded-lg">
                          <Users className="w-8 h-8" />
                        </div>
                        <TrendingUp className="w-6 h-6 opacity-75" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">
                        {stats.totalJoined}
                      </h3>
                      <p className="text-purple-50 text-sm">Events Joined</p>
                    </div>

                    {/* Total Participants */}
                    <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-3 rounded-lg">
                          <Users className="w-8 h-8" />
                        </div>
                        <TrendingUp className="w-6 h-6 opacity-75" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">
                        {stats.totalParticipants}
                      </h3>
                      <p className="text-orange-50 text-sm">
                        Total Participants
                      </p>
                    </div>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Bar Chart - Events by Type */}
                    <div className="bg-base-100 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <BarChart3 className="w-6 h-6 text-green-700" />
                        <h3 className="text-xl font-bold">Events by Type</h3>
                      </div>
                      <div className="space-y-4">
                        {Object.entries(chartData.byType).map(
                          ([type, count]) => {
                            const maxCount = Math.max(
                              ...Object.values(chartData.byType),
                              1
                            );
                            const percentage = (count / maxCount) * 100;
                            return (
                              <div key={type}>
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm font-medium">
                                    {type}
                                  </span>
                                  <span className="text-sm font-bold text-green-700">
                                    {count}
                                  </span>
                                </div>
                                <div className="w-full bg-base-200 rounded-full h-3">
                                  <div
                                    className="bg-linear-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    {/* Pie Chart representation - Events by Month */}
                    <div className="bg-base-100 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <PieChart className="w-6 h-6 text-green-700" />
                        <h3 className="text-xl font-bold">
                          Monthly Distribution
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(chartData.byMonth).map(
                          ([month, count], index) => {
                            const colors = [
                              "bg-green-500",
                              "bg-blue-500",
                              "bg-purple-500",
                              "bg-orange-500",
                              "bg-pink-500",
                              "bg-yellow-500",
                            ];
                            return (
                              <div
                                key={month}
                                className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
                              >
                                <div
                                  className={`w-4 h-4 rounded-full ${
                                    colors[index % colors.length]
                                  }`}
                                ></div>
                                <div>
                                  <p className="text-sm font-medium">{month}</p>
                                  <p className="text-lg font-bold text-green-700">
                                    {count}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Recent Events Table */}
                  <div className="bg-base-100 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <FileEdit className="w-6 h-6 text-green-700" />
                      Recent Events
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead>
                          <tr className="border-b-2 border-green-700">
                            <th className="text-left">Title</th>
                            <th className="text-left">Type</th>
                            <th className="text-left">Location</th>
                            <th className="text-left">Date</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentEvents.length === 0 ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center py-8 text-accent"
                              >
                                No events created yet
                              </td>
                            </tr>
                          ) : (
                            recentEvents.map((event) => (
                              <tr
                                key={event._id}
                                className="hover:bg-base-200 transition-colors"
                              >
                                <td className="font-medium">{event.title}</td>
                                <td>
                                  <span className="badge badge-outline border-green-700 text-green-700">
                                    {event.eventType}
                                  </span>
                                </td>
                                <td className="text-sm text-accent">
                                  {event.location}
                                </td>
                                <td className="text-sm text-accent">
                                  {formatDate(event.eventDate)}
                                </td>
                                <td className="text-center">
                                  <Link
                                    to={`/event/${event._id}`}
                                    className="btn btn-sm btn-outline btn-primary"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* CREATE EVENT TAB - Keep existing code */}
          {activeTab === "create" && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Plus className="w-8 h-8 text-green-700" />
                <h1 className="text-3xl font-bold text-green-700">
                  Create New Event
                </h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-base-100 p-6 rounded-lg shadow-md"
              >
                <div>
                  <label className="block mb-2 font-semibold" htmlFor="title">
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
                    className="block mb-2 font-semibold"
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
                  <label
                    className="block mb-2 font-semibold"
                    htmlFor="eventType"
                  >
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
                  <label
                    className="block mb-2 font-semibold"
                    htmlFor="thumbnail"
                  >
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
                  <label
                    className="block mb-2 font-semibold"
                    htmlFor="location"
                  >
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
                  <label
                    className="block mb-2 font-semibold"
                    htmlFor="eventDate"
                  >
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

          {/* MANAGE and JOINED TABS - Keep your existing code */}
          {activeTab === "manage" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileEdit className="w-8 h-8 text-green-700" />
                <h1 className="text-3xl font-bold text-green-700">
                  Manage My Events
                </h1>
              </div>
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
                <div className="text-center py-12 bg-base-100 rounded-lg">
                  <p className="text-xl text-accent">
                    You haven't created any events yet!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myEvents.map((event) => (
                    <div
                      key={event._id}
                      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
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
                        <div className="flex items-center gap-2 text-accent mb-2">
                          <MapPin className="w-4 h-4 text-green-700" />
                          <span className="text-sm text-accent">
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-accent mb-4">
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
                                className="btn btn-outline flex-1"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline flex-1"
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

          {activeTab === "joined" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-green-700" />
                <h1 className="text-3xl font-bold text-green-700">
                  My Joined Events
                </h1>
              </div>
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
                <div className="text-center py-12 bg-base-100 rounded-lg">
                  <p className="text-xl text-accent">
                    You haven't joined any events yet!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {joinedEvents.map((event) => (
                    <div
                      key={event._id}
                      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
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
      </main>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Dashboard;
