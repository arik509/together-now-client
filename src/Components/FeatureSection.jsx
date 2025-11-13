import React from "react";
import { motion } from "framer-motion";
import {
  Users, Sparkles, Leaf, Globe, HeartHandshake, Accessibility, Locate
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

const FeatureSection = () => (
  <section className="py-14 mb-12 bg-linear-to-b from-green-50 via-blue-50 to-yellow-50 dark:from-green-900 dark:via-blue-900 dark:to-yellow-900 transition-colors duration-500">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-extrabold text-center my-12 text-secondary tracking-tight">
        Empowering Social & Environmental Action
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >

        <motion.div className="feature-card group rounded-2xl shadow-xl p-8 text-center bg-green-50 dark:bg-green-800 hover:-translate-y-1 hover:scale-105 transition-transform duration-300 border-t-4 border-green-400"
          variants={cardVariants}
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-green-500 group-hover:text-green-700 dark:group-hover:text-green-300 transition" />
          </div>
          <h3 className="text-2xl font-semibold mb-5 text-green-700 dark:text-green-200">Host Impactful Events</h3>
          <p className="text-base text-neutral-700 dark:text-gray-100">
            Create and lead initiatives like community cleanups, blood donation camps, or awareness campaigns that bring positive change to society and the planet.
          </p>
        </motion.div>

        <motion.div className="feature-card group rounded-2xl shadow-xl p-8 text-center bg-blue-50 dark:bg-blue-800 hover:-translate-y-1 hover:scale-105 transition-transform duration-300 border-t-4 border-blue-400"
          variants={cardVariants}
        >
          <div className="flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-blue-500 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition" />
          </div>
          <h3 className="text-2xl font-semibold mb-5 text-blue-700 dark:text-blue-200">Volunteer Management</h3>
          <p className="text-base text-neutral-700 dark:text-gray-100">
            Coordinate with volunteers, track participation, and celebrate collective achievements that drive social and environmental progress.
          </p>
        </motion.div>

        <motion.div className="feature-card group rounded-2xl shadow-xl p-8 text-center bg-yellow-50 dark:bg-yellow-800 hover:-translate-y-1 hover:scale-105 transition-transform duration-300 border-t-4 border-yellow-400"
          variants={cardVariants}
        >
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-10 h-10 text-yellow-500 group-hover:text-yellow-700 dark:group-hover:text-yellow-200 transition" />
          </div>
          <h3 className="text-2xl font-semibold mb-5 text-yellow-700 dark:text-yellow-200">Sustainable Living Projects</h3>
          <p className="text-base text-neutral-700 dark:text-gray-100">
            Engage in eco-projects like recycling drives, renewable energy workshops, and tree planting programs promoting a cleaner, greener future.
          </p>
        </motion.div>

        <motion.div className="feature-card group rounded-2xl shadow-xl p-8 text-center bg-pink-50 dark:bg-pink-800 hover:-translate-y-1 hover:scale-105 transition-transform duration-300 border-t-4 border-pink-400"
          variants={cardVariants}
        >
          <div className="flex items-center justify-center mb-4">
            <HeartHandshake className="w-10 h-10 text-pink-500 group-hover:text-pink-700 dark:group-hover:text-pink-200 transition" />
          </div>
          <h3 className="text-2xl font-semibold mb-5 text-pink-700 dark:text-pink-200">Impact Highlights</h3>
          <p className="text-base text-neutral-700 dark:text-gray-100">
            Explore inspiring stories, images, and success reports showcasing how every small action contributes to meaningful environmental and social transformation.
          </p>
        </motion.div>

        <motion.div className="feature-card group rounded-2xl shadow-xl p-8 text-center bg-purple-50 dark:bg-purple-800 hover:-translate-y-1 hover:scale-105 transition-transform duration-300 border-t-4 border-purple-400"
          variants={cardVariants}
        >
          <div className="flex items-center justify-center mb-4">
            <Accessibility className="w-10 h-10 text-purple-500 group-hover:text-purple-700 dark:group-hover:text-purple-200 transition" />
          </div>
          <h3 className="text-2xl font-semibold mb-5 text-purple-700 dark:text-purple-200">Inclusive & Adaptive Design</h3>
          <p className="text-base text-neutral-700 dark:text-gray-100">
            Enjoy a seamless and inclusive platform experience optimized for accessibility, sustainability awareness, and ease of use on any device.
          </p>
        </motion.div>

        <motion.div className="feature-card group rounded-2xl shadow-xl p-8 text-center bg-orange-50 dark:bg-orange-800 hover:-translate-y-1 hover:scale-105 transition-transform duration-300 border-t-4 border-orange-400"
          variants={cardVariants}
        >
          <div className="flex items-center justify-center mb-4">
            <Locate className="w-10 h-10 text-orange-500 group-hover:text-orange-700 dark:group-hover:text-orange-200 transition" />
          </div>
          <h3 className="text-2xl font-semibold mb-5 text-orange-700 dark:text-orange-200">Discover Local Movements</h3>
          <p className="text-base text-neutral-700 dark:text-gray-100">
            Find nearby social or environmental events through smart filters and connect with others making a difference in your community.
          </p>
        </motion.div>

      </motion.div>
    </div>
  </section>
);

export default FeatureSection;
