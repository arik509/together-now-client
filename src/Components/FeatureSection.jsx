import React from "react";

const FeatureSection = () => (
  <section className="py-12 my-10 bg-base-100 transition-colors duration-500">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Empowering Social & Environmental Action
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="feature-card rounded-lg shadow-lg p-6 text-center bg-green-50 dark:bg-green-800 hover:scale-105 transition-transform duration-300 border-t-4 border-green-400">
          <h3 className="text-xl font-semibold mb-5 text-green-700 dark:text-green-200">Host Impactful Events</h3>
          <p className="text-base text-neutral dark:text-gray-100">
            Create and lead initiatives like community cleanups, blood donation camps, or awareness campaigns that bring positive change to society and the planet.
          </p>
        </div>

        <div className="feature-card rounded-lg shadow-lg p-6 text-center bg-blue-50 dark:bg-blue-800 hover:scale-105 transition-transform duration-300 border-t-4 border-blue-400">
          <h3 className="text-xl font-semibold mb-5 text-blue-700 dark:text-blue-200">Volunteer Management</h3>
          <p className="text-base text-neutral dark:text-gray-100">
            Coordinate with volunteers, track participation, and celebrate collective achievements that drive social and environmental progress.
          </p>
        </div>

        <div className="feature-card rounded-lg shadow-lg p-6 text-center bg-yellow-50 dark:bg-yellow-800 hover:scale-105 transition-transform duration-300 border-t-4 border-yellow-400">
          <h3 className="text-xl font-semibold mb-5 text-yellow-700 dark:text-yellow-200">Sustainable Living Projects</h3>
          <p className="text-base text-neutral dark:text-gray-100">
            Engage in eco-projects like recycling drives, renewable energy workshops, and tree planting programs promoting a cleaner, greener future.
          </p>
        </div>

        <div className="feature-card rounded-lg shadow-lg p-6 text-center bg-pink-50 dark:bg-pink-800 hover:scale-105 transition-transform duration-300 border-t-4 border-pink-400">
          <h3 className="text-xl font-semibold mb-5 text-pink-700 dark:text-pink-200">Impact Highlights</h3>
          <p className="text-base text-neutral dark:text-gray-100">
            Explore inspiring stories, images, and success reports showcasing how every small action contributes to meaningful environmental and social transformation.
          </p>
        </div>

        <div className="feature-card rounded-lg shadow-lg p-6 text-center bg-purple-50 dark:bg-purple-800 hover:scale-105 transition-transform duration-300 border-t-4 border-purple-400">
          <h3 className="text-xl font-semibold mb-5 text-purple-700 dark:text-purple-200">Inclusive & Adaptive Design</h3>
          <p className="text-base text-neutral dark:text-gray-100">
            Enjoy a seamless and inclusive platform experience optimized for accessibility, sustainability awareness, and ease of use on any device.
          </p>
        </div>

        <div className="feature-card rounded-lg shadow-lg p-6 text-center bg-orange-50 dark:bg-orange-800 hover:scale-105 transition-transform duration-300 border-t-4 border-orange-400">
          <h3 className="text-xl font-semibold mb-5 text-orange-700 dark:text-orange-200">Discover Local Movements</h3>
          <p className="text-base text-neutral dark:text-gray-100">
            Find nearby social or environmental events through smart filters and connect with others making a difference in your community.
          </p>
        </div>

      </div>
    </div>
  </section>
);

export default FeatureSection;
