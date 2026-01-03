import React, { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "https://i.ibb.co/qFLkhr7X/Community-Tree-Planting2.png",
    alt: "Community Tree Planting",
    category: "Plantation",
  },
  {
    src: "https://i.ibb.co/v6vqV58z/Beach-Cleanup-Drive.jpg",
    alt: "Beach Cleanup Drive",
    category: "Cleanup",
  },
  {
    src: "https://i.ibb.co/VWZmgyVt/Volunteers-at-Work.jpg",
    alt: "Volunteers at Work",
    category: "Community",
  },
  {
    src: "https://i.ibb.co/jPYSDB9R/Community-Awareness-Campaign.jpg",
    alt: "Community Awareness Campaign",
    category: "Awareness",
  },
  {
    src: "https://i.ibb.co/TDTNSmJH/Blood-Donation-Camp.jpg",
    alt: "Blood Donation Camp",
    category: "Donation",
  },
  {
    src: "https://i.ibb.co/m51L2m2n/Renewable-Energy-Workshop.jpg",
    alt: "Renewable Energy Workshop",
    category: "Workshop",
  },
  {
    src: "https://i.ibb.co/jksTJRRt/Neighborhood-Gardening.jpg",
    alt: "Neighborhood Gardening",
    category: "Community",
  },
  {
    src: "https://i.ibb.co/RTSn6KsQ/School-Volunteer-Program.jpg",
    alt: "School Volunteer Program",
    category: "Education",
  },
];

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  React.useEffect(() => {
    if (lightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxOpen]);

  return (
    <section className="py-16 bg-linear-to-b from-base-100 to-base-200 transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-accent max-w-2xl mx-auto">
            Witness the impact of our community events through these memorable
            moments
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large Featured Images */}
          <div
            className="col-span-2 row-span-2 rounded-2xl shadow-2xl overflow-hidden relative group cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-full object-cover min-h-[300px] md:min-h-[500px] group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-green-700 text-white text-xs font-semibold rounded-full mb-2">
                  {images[0].category}
                </span>
                <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                  {images[0].alt}
                </p>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div
            className="col-span-2 row-span-2 rounded-2xl shadow-2xl overflow-hidden relative group cursor-pointer"
            onClick={() => openLightbox(1)}
          >
            <img
              src={images[1].src}
              alt={images[1].alt}
              className="w-full h-full object-cover min-h-[300px] md:min-h-[500px] group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded-full mb-2">
                  {images[1].category}
                </span>
                <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                  {images[1].alt}
                </p>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Smaller Images */}
          {images.slice(2).map((image, index) => {
            const colors = [
              "bg-purple-700",
              "bg-orange-700",
              "bg-pink-700",
              "bg-teal-700",
              "bg-indigo-700",
              "bg-red-700",
            ];
            return (
              <div
                key={index + 2}
                className="rounded-2xl shadow-xl overflow-hidden relative group cursor-pointer h-48 md:h-64"
                onClick={() => openLightbox(index + 2)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span
                      className={`inline-block px-2 py-1 ${
                        colors[index % colors.length]
                      } text-white text-xs font-semibold rounded-full mb-2`}
                    >
                      {image.category}
                    </span>
                    <p className="text-white text-sm md:text-base font-bold drop-shadow-lg line-clamp-2">
                      {image.alt}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <span className="inline-block px-3 py-1 bg-green-700 text-white text-xs font-semibold rounded-full mb-2">
                {images[currentImageIndex].category}
              </span>
              <p className="text-white text-xl md:text-2xl font-bold">
                {images[currentImageIndex].alt}
              </p>
              <p className="text-white/80 text-sm mt-1">
                Image {currentImageIndex + 1} of {images.length}
              </p>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index
                    ? "border-green-700 scale-110"
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
