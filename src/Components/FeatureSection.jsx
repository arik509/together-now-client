import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  Leaf,
  Globe,
  HeartHandshake,
  Accessibility,
  Locate,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const FeatureSection = () => {
  const features = [
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Host Impactful Events",
      description:
        "Create and lead initiatives like community cleanups, blood donation camps, or awareness campaigns that bring positive change to society and the planet.",
      linear: "from-green-400 to-emerald-500",
      iconBg: "bg-primary",
      iconColor: "text-green-200",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Volunteer Management",
      description:
        "Coordinate with volunteers, track participation, and celebrate collective achievements that drive social and environmental progress.",
      linear: "from-green-500 to-emerald-600",
      iconBg: "bg-primary",
      iconColor: "text-green-200",
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Sustainable Living Projects",
      description:
        "Engage in eco-projects like recycling drives, renewable energy workshops, and tree planting programs promoting a cleaner, greener future.",
      linear: "from-emerald-500 to-green-600",
      iconBg: "bg-primary",
      iconColor: "text-green-200",
    },
    {
      icon: <HeartHandshake className="w-12 h-12" />,
      title: "Impact Highlights",
      description:
        "Explore inspiring stories, images, and success reports showcasing how every small action contributes to meaningful environmental and social transformation.",
      linear: "from-green-600 to-emerald-700",
      iconBg: "bg-primary",
      iconColor: "text-green-200",
    },
    {
      icon: <Accessibility className="w-12 h-12" />,
      title: "Inclusive & Adaptive Design",
      description:
        "Enjoy a seamless and inclusive platform experience optimized for accessibility, sustainability awareness, and ease of use on any device.",
      linear: "from-emerald-600 to-green-700",
      iconBg: "bg-primary",
      iconColor: "text-green-200",
    },
    {
      icon: <Locate className="w-12 h-12" />,
      title: "Discover Local Movements",
      description:
        "Find nearby social or environmental events through smart filters and connect with others making a difference in your community.",
      linear: "from-green-700 to-emerald-800",
      iconBg: "bg-primary",
      iconColor: "text-green-200",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-b from-base-100 via-base-200 to-base-100 duration-500 relative overflow-hidden">
      {/* Decorative Background Elements */}
      {/* <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 dark:bg-green-900 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div> */}

      <div className="w-11/12 mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-accent rounded-full text-sm font-semibold uppercase tracking-wide">
              Our Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Empowering Social & Environmental Action
          </h2>
          <p className="text-lg text-accent max-w-3xl mx-auto">
            Discover powerful tools and features designed to make community
            engagement simple, effective, and impactful
          </p>
        </div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300 hover:border-green-500"
              variants={cardVariants}
            >
              {/* linear Border Top */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${feature.linear}`}
              ></div>

              {/* Card Content */}
              <div className="p-8 relative">
                {/* Icon Container */}
                <div className="mb-6 relative">
                  <div
                    className={`${feature.iconBg} ${feature.iconColor} w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    {feature.icon}
                  </div>
                  {/* Decorative dot */}
                  <div
                    className={`absolute -top-2 -right-2 w-6 h-6 bg-linear-to-br ${feature.linear} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-green-400  transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base text-accent leading-relaxed">
                  {feature.description}
                </p>

              </div>

              {/* Background Pattern on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-linear(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-accent mb-6">
            Ready to start making a difference?
          </p>
          <a href="/upcoming-events">
            <button className="px-8 py-4 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              Explore All Events
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
