const Arrow = ({ className = "w-5 h-5" }) => {
  return (
   //  <div className="inline"> 
      <svg
        width="9"
        height="18"
        viewBox="0 0 9 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M0 18L9 9L0 0V18Z" fill="url(#paint0_linear_1248_6084)" />
        <defs>
          <linearGradient
            id="paint0_linear_1248_6084"
            x1="4.5"
            y1="0"
            x2="4.5"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A26DFF" />
            <stop offset="0.505" stopColor="#614199" />
          </linearGradient>
        </defs>
      </svg>
   //  </div>
  );
};

export default Arrow;
