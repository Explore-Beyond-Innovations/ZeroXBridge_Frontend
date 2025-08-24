import React from "react";

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  link?: string;
};

interface BlogComponentProps {
  post: BlogPost;
}

const BlogComponent: React.FC<BlogComponentProps> = ({ post }) => {
  return (
    <div className="bg-[#1A1A1A] rounded-md border border-[#2A2A2A] overflow-hidden shadow flex flex-col">
      {post.image && (
        <div className="w-full h-28 bg-[#231B32] relative">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-3 flex flex-col flex-1">
        <h2 className="text-[15px] font-mono font-[600] text-white mb-1">
          {post.title}
        </h2>
        <p className="text-[12px] text-[#B9B9B9] font-inter font-[300] mb-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[10px] text-white font-mono font-[400]">
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

          {post.link ? (
            <a
              href={post.link}
              className="bg-white text-black text-[10px] font-semibold px-6 py-1 rounded-full shadow hover:bg-gray-100 transition-colors"
            >
              Read More
            </a>
          ) : (
            <button
              className="bg-white text-black text-[10px] font-semibold px-6 py-1 rounded-full shadow cursor-default opacity-70"
              disabled
            >
              Read More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
