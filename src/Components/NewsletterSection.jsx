import React from "react";

const NewsletterSection = () => (
  <section className="py-16 bg-green-50 dark:bg-green-900 transition-colors duration-500">
    <div className="container mx-auto px-4 text-center max-w-xl">
      <h2 className="text-4xl font-extrabold mb-4 text-green-800 dark:text-green-300">
        Stay Connected
      </h2>
      <p className="text-green-700 dark:text-green-200 mb-8">
        Subscribe to our newsletter for the latest updates on community events, eco-friendly initiatives, and ways you can make a difference.
      </p>
      <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-4 py-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-800 dark:border-green-700 dark:text-green-100"
        />
        <button
          type="submit"
          className="px-8 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>
);

export default NewsletterSection;
