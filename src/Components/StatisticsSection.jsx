import React, { useEffect, useState, useRef } from 'react';
import { Users, Calendar, Heart, Award } from 'lucide-react';

const StatisticsSection = () => {
  const [counts, setCounts] = useState({
    events: 0,
    participants: 0,
    communities: 0,
    impact: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const finalCounts = {
    events: 500,
    participants: 5000,
    communities: 50,
    impact: 95,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        events: Math.floor(finalCounts.events * progress),
        participants: Math.floor(finalCounts.participants * progress),
        communities: Math.floor(finalCounts.communities * progress),
        impact: Math.floor(finalCounts.impact * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(finalCounts);
      }
    }, stepDuration);
  };

  return (
    <section ref={sectionRef} className="py-16 bg-base-100">
      <div className="w-11/12 mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-accent max-w-2xl mx-auto">
            Join thousands of community members making a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Calendar className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-4xl font-bold text-green-700 mb-2">{counts.events}+</h3>
            <p className="text-lg text-accent">Events Organized</p>
          </div>

          <div className="text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-4xl font-bold text-blue-700 mb-2">{counts.participants}+</h3>
            <p className="text-lg text-accent">Active Participants</p>
          </div>

          <div className="text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-4xl font-bold text-red-700 mb-2">{counts.communities}+</h3>
            <p className="text-lg text-accent">Communities Served</p>
          </div>

          <div className="text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Award className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-4xl font-bold text-purple-700 mb-2">{counts.impact}%</h3>
            <p className="text-lg text-accent">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
