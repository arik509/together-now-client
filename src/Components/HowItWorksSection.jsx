import React from "react";
import { UserPlus, PlusCircle, Users, Award } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <UserPlus className="w-12 h-12" />,
      title: "Sign Up",
      description: "Create your free account in seconds and join our community",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: <PlusCircle className="w-12 h-12" />,
      title: "Create or Browse",
      description:
        "Start your own event or discover existing ones in your area",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Participate",
      description: "Join events, meet new people, and make an impact together",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Make Impact",
      description: "See the positive change you've created in your community",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="w-11/12 mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-accent max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to become part of
            the change
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-base-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div
                className={`flex justify-center mb-4 ${step.bgColor} ${step.color} p-4 rounded-full w-20 h-20 mx-auto`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-center mb-3">
                {step.title}
              </h3>
              <p className="text-accent text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
