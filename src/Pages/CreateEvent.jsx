import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Awareness",
  "Workshop",
];

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [thumbnail, setThumbnail] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [loading, setLoading] = useState(false);

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

      const data = await response.json();

      if (response.ok) {
        toast.success("Event created successfully!");

        setTitle("");
        setDescription("");
        setEventType(EVENT_TYPES[0]);
        setThumbnail("");
        setLocation("");
        setEventDate(null);

        setTimeout(() => {
          navigate("/upcoming-events");
        }, 2000);
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

  const today = new Date();
  const minDate = today;

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4 text-center text-red-600 font-semibold">
        You must be logged in to create an event.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Create Event</h1>
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
          <label className="block mb-1 font-semibold" htmlFor="description">
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
            minDate={minDate}
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

      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateEvent;
