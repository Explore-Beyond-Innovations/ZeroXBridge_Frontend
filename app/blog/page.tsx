"use client";
import React from 'react';
import Navbar from '../Landing-v2/HeroSection/Navbar';
import BlogBg from './BlogBg';
import GradientText from '../components/ui/GradientText';
import BlogComponent from './BlogComponent';
import BlogSideComponent from './BlogSideComponent';

const featuredPosts = [
  {
    id: 1,
    title: 'Exploring the Benefits of Cross-Chain Bridges',
    date: 'Apr 15, 2024',
    image: '/safe.png',
    tag: 'Latest',
    tagColor: 'bg-black',
    link: '#'
  },
  {
    id: 2,
    title: 'Understanding ZK Proofs in Cross-Chain Bridges',
    date: 'Apr 10, 2024',
    image: '/shield.png',
    tag: 'Popular',
    tagColor: 'bg-black',
    link: '#'
  }
];

const blogPosts = [
  {
    id: 1,
    title: 'How xZB Enables Instant Liquidity on Starknet',
    excerpt: 'How xZB tokens unlock new DeFi opportunities and liquidity.',
    date: '2024-03-28',
    image: '/token.png',
    link: '#'
  },
  {
    id: 2,
    title: 'Trustless Architecture: Eliminating Human Risk',
    excerpt: 'ZeroXBridge\'s trustless, ZK-powered architecture explained.',
    date: '2024-03-15',
    image: '/castle.png',
    link: '#'
  },
  {
    id: 3,
    title: 'A Beginner\'s Guide to Cross-Chain Bridges',
    excerpt: 'The basics of cross-chain technology and bridges.',
    date: '2024-02-20',
    image: '/safe.png',
    link: '#'
  },
  {
    id: 4,
    title: 'Security Best Practices for Bridge Users',
    excerpt: 'Essential security tips for safe cross-chain transactions.',
    date: '2024-02-10',
    image: '/shield.png',
    link: '#'
  },
  {
    id: 5,
    title: 'ZeroXBridge vs Traditional Bridges',
    excerpt: 'Comparing our ZK-powered approach to legacy solutions.',
    date: '2024-02-05',
    image: '/token.png',
    link: '#'
  },
  {
    id: 6,
    title: 'The Future of Cross-Chain DeFi',
    excerpt: 'Emerging trends and opportunities in cross-chain finance.',
    date: '2024-02-01',
    image: '/castle.png',
    link: '#'
  }
];

const Page = () => {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <div className="relative z-10 pt-9">
        <div className="text-center max-w-[90%] md:max-w-[420px] mx-auto py-2">
          <h1 className="text-[24px] md:text-[32px] 2xl:text-[40px] font-mono font-[500] leading-tight mb-2 animate-fade-in">
            <GradientText>ZEROxBRIDGE</GradientText> BLOG
          </h1>
          <p className="text-[13px] md:text-[15px] text-[#9E9E9E] font-inter font-[300] max-w-[340px] mx-auto animate-fade-in-delay">
            Stay updated with the latest news, updates, and guides from the ZeroXBridge.
          </p>
        </div>
        
        
        <div className="max-w-[1300px] mx-auto mt-5 px-4">
          
          <div className="w-full bg-black rounded-lg px-4 py-3 mb-8 border border-[#1A1A1A] flex flex-col md:flex-row items-center gap-3 md:gap-6 animate-slide-up">
            
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="shrink-0 animate-pulse-slow" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="14" height="2" rx="1" fill="#A26DFF"/>
              <rect x="6" y="9" width="8" height="2" rx="1" fill="#A26DFF"/>
              <rect x="9" y="14" width="2" height="2" rx="1" fill="#A26DFF"/>
            </svg>
            
            <div className="flex flex-wrap gap-2">
              <button className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-sm focus:outline-none transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-white/20">
                All Posts
              </button>
              <button className="bg-transparent border border-[#1A1A1A] text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-[#0A0A0A] hover:border-white transition-all duration-200 transform hover:scale-105">
                Announcements
              </button>
              <button className="bg-transparent border border-[#1A1A1A] text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-[#0A0A0A] hover:border-white transition-all duration-200 transform hover:scale-105">
                Educational
              </button>
              <button className="bg-transparent border border-[#1A1A1A] text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-[#0A0A0A] hover:border-white transition-all duration-200 transform hover:scale-105">
                Ecosystem
              </button>
              <button className="bg-transparent border border-[#1A1A1A] text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-[#0A0A0A] hover:border-white transition-all duration-200 transform hover:scale-105">
                Industry News
              </button>
            </div>
            
            <div className="flex-1 flex justify-end">
              <div className="relative w-full max-w-[180px]">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-black border border-[#1A1A1A] text-white text-xs rounded-full py-1.5 pl-8 pr-3 focus:outline-none placeholder-white focus:border-white transition-all duration-200 hover:border-[#2A2A2A]"
                />
                <svg
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <circle cx="7" cy="7" r="5.5" stroke="#FFF" strokeWidth="1.2"/>
                  <path d="M12 12L10 10" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-3">
              <BlogSideComponent />
            </div>
            
            
            <div className="lg:col-span-9">
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredPosts.map((post, index) => (
                    <div 
                      key={post.id} 
                      className="flex bg-black rounded-xl overflow-hidden border border-[#1A1A1A] relative group animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      
                      <div className="absolute top-2 left-2 z-10">
                        <span className={`${post.tagColor} text-white text-[11px]  font-mono font-[600] px-3 py-1 rounded-full border-[#A26DFF] border-[0.5px] select-none transform group-hover:scale-110 transition-all duration-200`}>
                          {post.tag}
                        </span>
                      </div>
                      
                      <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-black flex items-center justify-center group-hover:bg-[#0A0A0A] transition-all duration-300">
                        
                        <img
                          src={post.image}
                          alt={post.title}
                          className="object-contain w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                      
                      <div className="flex flex-col justify-center px-3 md:px-4 py-3 md:py-4 flex-1">
                        <h3 className="text-white text-[13px] md:text-[14px] font-mono font-[600] leading-tight mb-2 group-hover:text-[#A26DFF] transition-colors duration-200">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-white font-mono font-[400]">
                            {post.date}
                          </span>
                          <a
                            href={post.link}
                            className="bg-white text-black text-xs font-semibold px-2 py-1 rounded-full shadow hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#A26DFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  ))}
                </div>
                
                
                <div className="animate-fade-in-up-delay">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogPosts.map((post, index) => (
                      <div 
                        key={post.id}
                        className="transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <BlogComponent post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BlogBg />
      
      
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-left {
          from { 
            opacity: 0; 
            transform: translateX(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-slide-left {
          animation: slide-left 0.6s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default Page;