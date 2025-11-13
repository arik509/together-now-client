import React from "react";

const images = [
  {
    src: "https://i.ibb.co/qFLkhr7X/Community-Tree-Planting2.png",
    alt: "Community Tree Planting",
  },
  {
    src: "https://i.ibb.co/v6vqV58z/Beach-Cleanup-Drive.jpg",
    alt: "Beach Cleanup Drive",
  },
  {
    src: "https://i.ibb.co/VWZmgyVt/Volunteers-at-Work.jpg",
    alt: "Volunteers at Work",
  },
  {
    src: "https://i.ibb.co/jPYSDB9R/Community-Awareness-Campaign.jpg",
    alt: "Community Awareness Campaign",
  },
  {
    src: "https://i.ibb.co/TDTNSmJH/Blood-Donation-Camp.jpg",
    alt: "Blood Donation Camp",
  },
  {
    src: "https://i.ibb.co/m51L2m2n/Renewable-Energy-Workshop.jpg",
    alt: "Renewable Energy Workshop",
  },
  {
    src: "https://i.ibb.co/jksTJRRt/Neighborhood-Gardening.jpg",
    alt: "Neighborhood Gardening",
  },
  {
    src: "https://i.ibb.co/RTSn6KsQ/School-Volunteer-Program.jpg",
    alt: "School Volunteer Program",
  },
];

const GallerySection = () => (
  <section className="py-12 bg-base-100 transition-colors duration-500">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">
        Our Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-3 gap-7">
        <div className="col-span-1 sm:col-span-2 md:col-span-2 row-span-2 rounded-lg shadow-2xl overflow-hidden relative group">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-full object-cover min-h-60 max-h-[450px] group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <p className="text-white text-lg md:text-2xl font-semibold px-4 text-center drop-shadow-lg">
              {images[0].alt}
            </p>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-2 row-span-2 rounded-lg shadow-2xl overflow-hidden relative group">
          <img
            src={images[1].src}
            alt={images[1].alt}
            className="w-full h-full object-cover min-h-80 max-h-[450px] group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <p className="text-white text-lg md:text-2xl font-semibold px-4 text-center drop-shadow-lg">
              {images[1].alt}
            </p>
          </div>
        </div>
        
        <div className="rounded-lg shadow-xl overflow-hidden relative group h-44 sm:h-56">
          <img
            src={images[2].src}
            alt={images[2].alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <p className="text-white text-base font-semibold px-3 text-center drop-shadow-lg">{images[2].alt}</p>
          </div>
        </div>
        <div className="rounded-lg shadow-xl overflow-hidden relative group h-44 sm:h-56">
          <img
            src={images[3].src}
            alt={images[3].alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <p className="text-white text-base font-semibold px-3 text-center drop-shadow-lg">{images[3].alt}</p>
          </div>
        </div>
        <div className="rounded-lg shadow-xl overflow-hidden relative group h-44 sm:h-56">
          <img
            src={images[4].src}
            alt={images[4].alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <p className="text-white text-base font-semibold px-3 text-center drop-shadow-lg">{images[4].alt}</p>
          </div>
        </div>
        <div className="rounded-lg shadow-xl overflow-hidden relative group h-44 sm:h-56">
          <img
            src={images[5].src}
            alt={images[5].alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <p className="text-white text-base font-semibold px-3 text-center drop-shadow-lg">{images[5].alt}</p>
          </div>
        </div>
        <div className="rounded-lg shadow-xl overflow-hidden relative group h-44 sm:h-56">
          <img
            src={images[6].src}
            alt={images[6].alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <p className="text-white text-base font-semibold px-3 text-center drop-shadow-lg">{images[6].alt}</p>
          </div>
        </div>
        <div className="rounded-lg shadow-xl overflow-hidden relative group h-44 sm:h-56">
          <img
            src={images[7].src}
            alt={images[7].alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <p className="text-white text-base font-semibold px-3 text-center drop-shadow-lg">{images[7].alt}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GallerySection;
