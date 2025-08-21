import React from 'react';

const BlogSideComponent: React.FC = () => {
  return (
    <div className="sticky top-24 bg-[#1A1A1A] rounded-lg p-4 h-fit border border-[#2A2A2A]">
      <h3 className="text-[16px] font-mono font-[500] text-white mb-3">
        Categories
      </h3>
      <div className="space-y-2">
        <div className="text-[13px] text-white font-inter font-[300] hover:text-white cursor-pointer transition-colors">
          Technology
        </div>
        <div className="text-[13px] text-white font-inter font-[300] hover:text-white cursor-pointer transition-colors">
          Updates
        </div>
        <div className="text-[13px] text-white font-inter font-[300] hover:text-white cursor-pointer transition-colors">
          Guides
        </div>
        <div className="text-[13px] text-white font-inter font-[300] hover:text-white cursor-pointer transition-colors">
          Community
        </div>
      </div>
    </div>
  );
};

export default BlogSideComponent;
