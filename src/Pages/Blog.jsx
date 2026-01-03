import React, { useState } from "react";
import { Calendar, User, Clock, Search, Tag } from "lucide-react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Community", "Environment", "Social Impact", "Events", "Tips"];

  const blogPosts = [
    {
      id: 1,
      title: "10 Ways to Make Your Community Cleanup More Effective",
      excerpt: "Discover proven strategies to organize successful community cleanup events that make a lasting impact on your neighborhood.",
      author: "Sarah Rahman",
      date: "January 3, 2026",
      readTime: "5 min read",
      category: "Community",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "The Environmental Impact of Tree Plantation Drives",
      excerpt: "Learn how organized tree planting initiatives contribute to carbon reduction and biodiversity preservation in urban areas.",
      author: "Michael Chen",
      date: "January 2, 2026",
      readTime: "7 min read",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Building Stronger Communities Through Volunteer Work",
      excerpt: "Explore the psychological and social benefits of volunteering and how it creates meaningful connections in your community.",
      author: "Emily Rodriguez",
      date: "December 30, 2025",
      readTime: "6 min read",
      category: "Social Impact",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "How to Organize a Successful Blood Donation Camp",
      excerpt: "A comprehensive guide to planning, promoting, and executing blood donation drives that save lives in your community.",
      author: "Dr. Ahmed Hassan",
      date: "December 28, 2025",
      readTime: "8 min read",
      category: "Events",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Sustainable Living: Small Changes, Big Impact",
      excerpt: "Simple lifestyle modifications that contribute to environmental conservation and inspire others in your community.",
      author: "Green Living Team",
      date: "December 25, 2025",
      readTime: "5 min read",
      category: "Tips",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "The Power of Awareness Campaigns in Social Change",
      excerpt: "Case studies of successful awareness campaigns and how they influenced policy changes and public behavior.",
      author: "Sarah Rahman",
      date: "December 22, 2025",
      readTime: "6 min read",
      category: "Social Impact",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-base-100 to-base-200 py-12">
      <div className="w-11/12 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-green-700 mb-4">
            Community Blog
          </h1>
          <p className="text-lg text-accent max-w-2xl mx-auto">
            Stories, insights, and tips for building stronger communities
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="input input-bordered w-full pl-12"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-green-700 text-white shadow-lg"
                    : "bg-base-200 hover:bg-green-100 dark:hover:bg-green-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="badge badge-outline border-green-700 text-green-700 mb-3">
                  <Tag className="w-3 h-3 mr-1" />
                  {post.category}
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-green-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-accent text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-accent border-t border-base-300 pt-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-green-700" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-700" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-accent mt-2">
                  <Calendar className="w-3 h-3 text-green-700" />
                  <span>{post.date}</span>
                </div>
                <button className="btn btn-primary btn-sm w-full mt-4">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-accent">No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
