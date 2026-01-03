import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-base-100 to-base-200 py-12">
      <div className="w-11/12 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-green-700 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-accent max-w-2xl mx-auto">
            Have questions or suggestions? We'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-xl">
              <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-green-50 mb-2">Send us an email anytime</p>
              <a
                href="mailto:to.now@gmail.com"
                className="font-semibold hover:underline"
              >
                to.now@gmail.com
              </a>
            </div>

            <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
              <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-blue-50 mb-2">Mon-Fri from 9am to 6pm</p>
              <a
                href="tel:+8801511515555"
                className="font-semibold hover:underline"
              >
                +880 1511 515 555
              </a>
            </div>

            <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
              <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-purple-50 mb-2">Come say hello</p>
              <p className="font-semibold">Dhanmondi, Dhaka, Bangladesh</p>
            </div>

            <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-green-700" />
                <h3 className="text-lg font-bold">Office Hours</h3>
              </div>
              <ul className="space-y-2 text-sm text-accent">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-8 h-8 text-green-700" />
                <h2 className="text-3xl font-bold text-green-700">
                  Send Us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-semibold" htmlFor="name">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold" htmlFor="email">
                      Your Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold" htmlFor="subject">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full btn-lg flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-700">
                <p className="text-sm text-accent">
                  <strong>Note:</strong> We typically respond within 24 hours
                  during business days. For urgent matters, please call us
                  directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Contact;
