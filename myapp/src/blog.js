import React from 'react';
import { useNavigate } from 'react-router-dom';

const blogPosts = [
  { id: 1, title: 'Top 10 Travel Destinations in India for 2024', content: 'Explore the most popular travel destinations across India for 2024.' },
  { id: 2, title: 'A Guide to Budget Traveling in India', content: 'Tips and tricks on how to make the most of your budget while traveling in India.' },
  { id: 3, title: 'The Best Beaches to Visit in India This Summer', content: 'Discover the best beaches in India to relax, unwind, and enjoy the summer.' },
  { id: 4, title: 'Cultural Festivals You Shouldn’t Miss in India', content: 'Explore the vibrant festivals in India that celebrate its diverse culture.' },
  { id: 5, title: 'Solo Travel in India: Tips for a Safe and Enjoyable Journey', content: 'Advice for solo travelers to stay safe and make the most of their experience in India.' },
  { id: 6, title: 'Top 5 Road Trips Across India', content: 'Plan your ultimate road trip with these iconic routes across India.' },
  { id: 7, title: 'How to Pack Light for Your India Trip', content: 'Learn the art of packing efficiently for your trip to India with a minimalist approach.' },
  { id: 8, title: 'Must-Have Travel Apps for Exploring India in 2024', content: 'The best travel apps to make planning and enjoying your trip to India a breeze.' },
  { id: 9, title: 'A Foodie’s Guide to Street Food Around India', content: 'Discover the best street foods in India for a tasty culinary adventure.' },
  { id: 10, title: '10 Hidden Gems to Explore in India', content: 'Explore India beyond the famous landmarks and discover hidden gems.' },
  { id: 11, title: 'How to Plan a Family-Friendly Vacation in India', content: 'Tips for planning a vacation in India that everyone in the family can enjoy.' },
  { id: 12, title: 'Top 7 Travel Scams to Watch Out for in India', content: 'Stay safe by learning about common travel scams in India and how to avoid them.' },
  { id: 13, title: 'Exploring National Parks in India: A Beginner’s Guide', content: 'Tips for first-time visitors to national parks in India for a memorable experience.' },
  { id: 14, title: 'The Ultimate Guide to Adventure Travel in India', content: 'For thrill-seekers looking to add some adventure to their travel plans in India.' },
  { id: 15, title: 'Eco-Friendly Travel in India: How to Reduce Your Carbon Footprint', content: 'Learn how to travel sustainably in India and make a positive impact on the environment.' },
  { id: 16, title: 'Travel Photography Tips for Capturing India’s Beauty', content: 'Capture stunning photos of your India trip with these beginner-friendly tips.' },
  { id: 17, title: 'Best Destinations for Backpackers in India', content: 'Explore the best destinations in India that cater to backpackers on a budget.' },
  { id: 18, title: 'How to Travel With Pets in India', content: 'A complete guide on how to make travel comfortable and safe for your pets in India.' },
  { id: 19, title: '5 Breathtaking Mountain Hikes to Experience in India', content: 'Discover some of India’s most beautiful and challenging mountain hikes.' },
  { id: 20, title: 'Essential Tips for First-Time International Travelers to India', content: 'Helpful tips for those embarking on their first international journey to India.' },
];

const Blog = () => {
  const navigate = useNavigate();
  
  const nextpage = (id) => {
    navigate(`/blogdetails/${id}`);
  };

  return (
    <div className="blog-page p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Travel Blog</h1>
      <div className="blog-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="blog-post bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{post.title}</h2>
            <p className="text-gray-600 mb-6">{post.content}</p>
            <button 
              onClick={() => nextpage(post.id)} 
              className="read-more bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
