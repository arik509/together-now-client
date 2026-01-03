import React from "react";
import {
  Trash2,
  TreePine,
  Heart,
  Megaphone,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router";

const EventCategoriesSection = () => {
  const categories = [
    {
      icon: <Trash2 className="w-10 h-10" />,
      title: "Cleanup",
      description: "Join environmental cleanup drives",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      count: "120+ Events",
    },
    {
      icon: <TreePine className="w-10 h-10" />,
      title: "Plantation",
      description: "Plant trees and green your community",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
      count: "85+ Events",
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Donation",
      description: "Support causes that matter",
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900",
      count: "150+ Events",
    },
    {
      icon: <Megaphone className="w-10 h-10" />,
      title: "Awareness",
      description: "Spread important messages",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      count: "95+ Events",
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: "Workshop",
      description: "Learn and grow together",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
      count: "50+ Events",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="w-11/12 mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700 mb-4">
            Event Categories
          </h2>
          <p className="text-lg text-accent max-w-2xl mx-auto">
            Find the perfect way to contribute to your community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/upcoming-events"
              className="group bg-base-200 p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div
                className={`flex justify-center mb-4 ${category.bgColor} ${category.color} p-4 rounded-full w-20 h-20 mx-auto group-hover:scale-110 transition-transform duration-300`}
              >
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-accent text-center mb-3">
                {category.description}
              </p>
              <p className="text-center text-green-700 font-semibold text-sm">
                {category.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategoriesSection;
