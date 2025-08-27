'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Search, Filter, Heart, Eye, Tag, Sparkles } from 'lucide-react';

// 임시 데이터 (나중에 Supabase로 교체)
const sampleArtworks = [
  {
    id: 1,
    title: "Cyberpunk City",
    imageUrl: "https://picsum.photos/400/300?random=1",
    aiTool: "Midjourney",
    prompt: "futuristic cyberpunk city at night, neon lights, rain",
    tags: ["cyberpunk", "city", "neon", "futuristic"],
    likes: 42,
    views: 156
  },
  {
    id: 2,
    title: "Fantasy Forest",
    imageUrl: "https://picsum.photos/400/300?random=2",
    aiTool: "DALL-E",
    prompt: "magical forest with glowing mushrooms, fantasy art",
    tags: ["fantasy", "forest", "magical", "nature"],
    likes: 38,
    views: 203
  },
  {
    id: 3,
    title: "Portrait Study",
    imageUrl: "https://picsum.photos/400/300?random=3",
    aiTool: "Stable Diffusion",
    prompt: "realistic portrait of a person, detailed, photographic",
    tags: ["portrait", "realistic", "detailed", "photographic"],
    likes: 67,
    views: 289
  },
  {
    id: 4,
    title: "Abstract Art",
    imageUrl: "https://picsum.photos/400/300?random=4",
    aiTool: "Leonardo AI",
    prompt: "abstract geometric shapes, colorful, modern art",
    tags: ["abstract", "geometric", "colorful", "modern"],
    likes: 23,
    views: 145
  },
  {
    id: 5,
    title: "Pixel Adventure",
    imageUrl: "https://picsum.photos/400/300?random=5",
    aiTool: "Custom Model",
    prompt: "pixel art character in 8-bit style game",
    tags: ["pixel-art", "8-bit", "character", "retro"],
    likes: 51,
    views: 178
  },
  {
    id: 6,
    title: "3D Render",
    imageUrl: "https://picsum.photos/400/300?random=6",
    aiTool: "Blender AI",
    prompt: "3d rendered object with realistic lighting",
    tags: ["3d", "render", "realistic", "lighting"],
    likes: 89,
    views: 334
  }
];

const aiTools = ["All", "Midjourney", "DALL-E", "Stable Diffusion", "Leonardo AI", "Custom Model", "Blender AI"];
const categories = ["All", "cyberpunk", "fantasy", "realistic", "abstract", "pixel-art", "3d"];

export default function AIGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // grid or masonry
  const [selectedImage, setSelectedImage] = useState<typeof sampleArtworks[0] | null>(null);

  const filteredArtworks = sampleArtworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTool = selectedTool === 'All' || artwork.aiTool === selectedTool;
    const matchesCategory = selectedCategory === 'All' || 
                           artwork.tags.some(tag => tag.includes(selectedCategory));
    
    return matchesSearch && matchesTool && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-gray-300" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Prism Gallery
              </h1>
            </div>
            <button className="bg-gradient-to-r from-gray-700 to-black hover:from-gray-600 hover:to-gray-800 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 flex items-center space-x-2 border border-gray-600">
              <Upload className="w-4 h-4" />
              <span>Upload Artwork</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search artworks or prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/30 backdrop-blur-md border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          {/* AI Tool Filter */}
          <div className="relative">
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="bg-black/30 backdrop-blur-md border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 min-w-[160px]"
            >
              {aiTools.map(tool => (
                <option key={tool} value={tool} className="bg-gray-800 text-white">
                  {tool}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black/30 backdrop-blur-md border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 min-w-[140px]"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800 text-white">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-300">
            {filteredArtworks.length} artworks found
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-black/20 text-gray-400 hover:text-white'
              }`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'masonry' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-black/20 text-gray-400 hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'columns-1 md:columns-2 lg:columns-3 xl:columns-4'
        }`}>
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className={`group relative bg-black/20 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-black/50 ${
                viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''
              }`}
              onClick={() => setSelectedImage(artwork)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{artwork.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{artwork.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Tool Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium border border-gray-600">
                    {artwork.aiTool}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-gray-300 transition-colors">
                  {artwork.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {artwork.prompt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {artwork.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 bg-black/30 text-gray-300 text-xs px-2 py-1 rounded-full border border-gray-600"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                  {artwork.tags.length > 3 && (
                    <span className="text-gray-500 text-xs px-2 py-1">
                      +{artwork.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArtworks.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No artworks found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors border border-gray-600">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-gray-300" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Prism Gallery
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Discover and share stunning AI-generated artwork from the world&apos;s most creative minds.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.887 2.748.098.119.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Trending</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Latest</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Most Liked</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">AI Tools</a></li>
              </ul>
            </div>

            {/* Create */}
            <div>
              <h4 className="text-white font-semibold mb-4">Create</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Upload Art</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">AI Prompts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Challenges</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">API</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-gray-800">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © 2024 Prism Gallery. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm">System Online</span>
              </div>
              <div className="text-gray-500 text-sm">
                Made with ❤️ by AI enthusiasts
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for selected image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-black/80 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                  <p className="text-gray-300 font-medium">{selectedImage.aiTool}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>
              
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Prompt</h4>
                  <p className="text-gray-300 bg-black/40 rounded-lg p-3 text-sm border border-gray-700">
                    {selectedImage.prompt}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-black/40 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span>{selectedImage.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Eye className="w-5 h-5" />
                    <span>{selectedImage.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}