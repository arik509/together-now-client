import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import {
  Calendar,
  Users,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  FileEdit,
  MapPin,
} from "lucide-react";
import { toast } from "react-toastify";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
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

  const EVENT_TYPES = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Awareness",
    "Workshop",
  ];

  useEffect(() => {
    if (user && user.email) {
      fetchDashboardData();
    }
  }, [user]);

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

      // Calculate stats
      const now = new Date();
      const upcomingMyEvents = myEventsData.filter(
        (e) => new Date(e.eventDate) > now
      );

      // Count participants
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

      // Chart data
      const typeCount = {};
      EVENT_TYPES.forEach((type) => {
        typeCount[type] = myEventsData.filter(
          (e) => e.eventType === type
        ).length;
      });
      setChartData((prev) => ({ ...prev, byType: typeCount }));

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

      // Recent events
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-green-700 rounded-full animate-bounce delay-200"></div>
        </div>
        <p className="mt-4 text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-8 h-8 text-green-700" />
        <h1 className="text-3xl font-bold text-green-700">
          Dashboard Overview
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Calendar className="w-8 h-8" />
            </div>
            <TrendingUp className="w-6 h-6 opacity-75" />
          </div>
          <h3 className="text-3xl font-bold mb-2">{stats.totalEvents}</h3>
          <p className="text-green-50 text-sm">Events Created</p>
        </div>

        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Activity className="w-8 h-8" />
            </div>
            <TrendingUp className="w-6 h-6 opacity-75" />
          </div>
          <h3 className="text-3xl font-bold mb-2">{stats.upcomingEvents}</h3>
          <p className="text-blue-50 text-sm">Upcoming Events</p>
        </div>

        <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Users className="w-8 h-8" />
            </div>
            <TrendingUp className="w-6 h-6 opacity-75" />
          </div>
          <h3 className="text-3xl font-bold mb-2">{stats.totalJoined}</h3>
          <p className="text-purple-50 text-sm">Events Joined</p>
        </div>

        <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Users className="w-8 h-8" />
            </div>
            <TrendingUp className="w-6 h-6 opacity-75" />
          </div>
          <h3 className="text-3xl font-bold mb-2">{stats.totalParticipants}</h3>
          <p className="text-orange-50 text-sm">Total Participants</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-base-100 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-green-700" />
            <h3 className="text-xl font-bold">Events by Type</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(chartData.byType).map(([type, count]) => {
              const maxCount = Math.max(...Object.values(chartData.byType), 1);
              const percentage = (count / maxCount) * 100;
              return (
                <div key={type}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{type}</span>
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
            })}
          </div>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-6 h-6 text-green-700" />
            <h3 className="text-xl font-bold">Monthly Distribution</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(chartData.byMonth).map(([month, count], index) => {
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
                    <p className="text-lg font-bold text-green-700">{count}</p>
                  </div>
                </div>
              );
            })}
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
                  <td colSpan="5" className="text-center py-8 text-accent">
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
                    <td className="text-sm text-accent">{event.location}</td>
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
    </div>
  );
};

export default DashboardHome;
