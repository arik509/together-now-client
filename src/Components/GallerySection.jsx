import React from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    alt: "Community Tree Planting",
  },
  {
    src: "https://images.unsplash.com/photo-1520975699185-01db9d2b6b20?auto=format&fit=crop&w=600&q=80",
    alt: "Beach Cleanup Drive",
  },
  {
    src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",
    alt: "Volunteers at Work",
  },
  {
    src: "https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=600&q=80",
    alt: "Community Awareness Campaign",
  },
  {
    src: "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=600&q=80",
    alt: "Blood Donation Camp",
  },
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    alt: "Renewable Energy Workshop",
  },
];

const GallerySection = () => (
  <section className="py-12 bg-base-100 transition-colors duration-500">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Event Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map(({ src, alt }, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4 bg-white dark:bg-gray-800">
              <p className="text-center text-gray-800 dark:text-gray-200 font-medium">
                {alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
