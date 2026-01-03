import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Together, We Build Better Communities",
    description:
      "Discover local initiatives, take part in events, and make a real difference.",
    buttonText: "Explore Events",
    buttonLink: "/upcoming-events",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&h=900&fit=crop&q=80", // Group of volunteers working together
  },
  {
    id: 2,
    title: "Join Community Events Near You",
    description:
      "Connect with like-minded people and participate in meaningful activities.",
    buttonText: "View Events",
    buttonLink: "/upcoming-events",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&h=900&fit=crop&q=80", // Community gathering/workshop
  },
  {
    id: 3,
    title: "Make a Difference in Your Community",
    description:
      "Create, manage, and join events that bring positive change to your neighborhood.",
    buttonText: "Get Started",
    buttonLink: "/upcoming-events",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&h=900&fit=crop&q=80", // Environmental cleanup volunteers
  },
];

const Banner = () => {
  const getTheme = () =>
    document.documentElement.getAttribute("data-theme") || "light";
  const [theme, setTheme] = useState(getTheme());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Theme observer
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-theme") {
          setTheme(getTheme());
        }
      }
    });
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 0.7,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-11/12 mx-auto my-8">
      <div
        className="relative overflow-hidden rounded-xl shadow-2xl h-[70vh]"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-full scale-95 pointer-events-none"
            }`}
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center h-full text-center px-4 z-10">
              <div
                className={`max-w-4xl transition-all duration-1000 delay-200 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Title with better contrast */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
                  {slide.title}
                </h1>

                {/* Description with shadow */}
                <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 drop-shadow-lg max-w-3xl mx-auto">
                  {slide.description}
                </p>

                {/* Call to Action Button */}
                <Link to={slide.buttonLink}>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg cursor-pointer">
                    {slide.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-green-800 dark:text-green-300" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-green-800 dark:text-green-300" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-12 h-3 bg-green-500"
                  : "w-3 h-3 bg-white/70 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce z-20 group"
          aria-label="Scroll to next section"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs md:text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
              Scroll Down
            </span>
            <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-xl group-hover:bg-white group-hover:scale-110 transition-all duration-300">
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-green-700" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Banner;
