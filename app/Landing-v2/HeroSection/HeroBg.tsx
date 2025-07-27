const HeroBg = () => {
  return (
    <div className="h-[100dvh] absolute top-0 left-0 w-full bg-[#090D10] b">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/hero-2.svg')] bg-cover opacity-10 bg-no-repeat bg-center" />
      <div className="absolute top-0 left-0 w-full h-[80%] bg-[url('/hero-3.svg')] opacity-10 bg-cover bg-no-repeat bg-center" />

      <div className="absolute bottom-0 translate-y-[60%] left-0 w-full h-full bg-[url('/hero-1.svg')] bg-cover bg-no-repeat bg-center" />
      <div
        className="h-full absolute top-0 left-0 w-full bg-[#090D10] bg-repeat"
        style={{
          backgroundImage: "url('/star-noise.png')",
          // backgroundSize: "200px 200px",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />
    </div>
  );
};

export default HeroBg;
