import React from "react";
import { UserPlus, PlusCircle, Users, Award } from "lucide-react";
import { Link } from "react-router";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <UserPlus className="w-16 h-16" />,
      title: "Sign Up",
      description:
        "Create your free account in seconds and join our community. No credit card required, just your passion to make a difference.",
      color: "text-green-600",
      linear: "from-green-400 to-emerald-500",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=400&fit=crop",
    },
    {
      icon: <PlusCircle className="w-16 h-16" />,
      title: "Create or Browse",
      description:
        "Start your own event or discover existing ones in your area. Filter by type, location, and date to find the perfect match.",
      color: "text-green-700",
      linear: "from-emerald-500 to-green-600",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=400&fit=crop",
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: "Participate",
      description:
        "Join events, meet new people, and make an impact together. Connect with like-minded community members.",
      color: "text-green-800",
      linear: "from-green-600 to-green-700",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=400&fit=crop",
    },
    {
      icon: <Award className="w-16 h-16" />,
      title: "Make Impact",
      description:
        "See the positive change you've created in your community. Track your contributions and celebrate achievements.",
      color: "text-green-900 dark:text-green-300",
      linear: "from-green-700 to-green-800",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=400&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-b from-base-100 to-base-200 relative overflow-hidden">
      {/* Decorative Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-11/12 lg:w-10/12 mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-accent max-w-3xl mx-auto leading-relaxed">
            Join thousands of community members in four simple steps. From
            signup to impact, we've made it seamless.
          </p>
        </div>

        {/* Steps - Zigzag Layout */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 lg:gap-16`}
            >
              {/* Image Side */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-4/3">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${step.linear} opacity-40 mix-blend-multiply`}
                    ></div>
                  </div>

                  {/* Floating Icon Badge */}
                  <div className="absolute -top-6 -right-6 lg:-right-8">
                    <div
                      className={`bg-linear-to-br ${step.linear} p-6 rounded-2xl shadow-2xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500`}
                    >
                      <div className="text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute -bottom-6 -left-6 lg:-left-8">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-green-500">
                      <span className="text-3xl lg:text-4xl font-bold text-green-700">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 w-full">
                <div className={`${index % 2 === 0 ? "lg:pl-8" : "lg:pr-8"}`}>
                  {/* Step Label */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-1 w-12 bg-linear-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl lg:text-5xl font-bold text-green-800  mb-6">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg lg:text-xl text-accent leading-relaxed mb-8">
                    {step.description}
                  </p>

                  {/* Action Button */}
                  <Link to="/upcoming-events"
                    className={`px-8 py-4 bg-linear-to-r ${step.linear} text-white font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="bg-linear-to-r from-green-600 to-emerald-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage:
                    "radial-linear(circle, white 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                Join our community today and start creating positive change in
                your neighborhood
              </p>
              <a href="/auth/register">
                <button className="px-10 py-5 bg-white text-green-700 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  Get Started Now
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
