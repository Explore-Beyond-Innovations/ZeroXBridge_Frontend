"use client";

import { motion } from "framer-motion";

interface GradientWrapperHoverProps {
  children: React.ReactNode;
  className?: string;
}

const GradientWrapperHover: React.FC<GradientWrapperHoverProps> = ({
  children,
  className = ""
}) => {
  return (
    <motion.div
      className={`p-0 rounded-2xl overflow-hidden xl:h-[200px] ${className}`}
      style={{
        backgroundImage: "url('/border.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
        whileHover={{ 
          padding: "1.5px",
          transition: { 
            type: "spring",
            stiffness: 400,
            damping: 10
          }
        }}
        initial={{ padding: 0 }}
        animate={{ padding: 0 }}
      >
        <motion.div 
          className="bg-[#0F0F0F] h-full"
          animate={{ 
            borderRadius: "0px"
          }}
          whileHover={{ 
            borderRadius: "16px",
            transition: { 
              type: "spring",
              stiffness: 600,
              damping: 20
            }
          }}
          transition={{ 
            type: "spring",
            stiffness: 1000,
            damping: 50
          }}
                >
          {children}
        </motion.div>
      </motion.div>
    );
  };
  
  export default GradientWrapperHover;