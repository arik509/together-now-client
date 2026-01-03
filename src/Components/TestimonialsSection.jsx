import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      image: "https://i.pravatar.cc/150?img=1",
      text: "Together Now made it incredibly easy to organize our community cleanup drive. We had over 100 participants!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Volunteer",
      image: "https://i.pravatar.cc/150?img=3",
      text: "I've joined 15 events through this platform. It's amazing how easy it is to find and participate in local initiatives.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Community Leader",
      image: "https://i.pravatar.cc/150?img=5",
      text: "The platform has transformed how we engage with our community. Highly recommended for anyone looking to make a difference.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700 mb-4">What Our Community Says</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real stories from real people making real change
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-green-200 dark:text-green-800" />
              
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-green-600"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
