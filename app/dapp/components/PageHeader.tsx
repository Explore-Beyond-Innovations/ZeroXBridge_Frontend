import Navbar from "./Navbar";

interface PageHeaderProps {
  title: string;
  description?: string;
  showNavbar?: boolean;
}

const PageHeader = ({ 
  title, 
  description, 
  showNavbar = true 
}: PageHeaderProps) => {
  return (
    <div
      className="xl:h-[406px] 4k:h-[894px] bg-[#090D10] relative"
      style={{
        backgroundImage: "url('/star-noise-2.png'), linear-gradient(135deg, #090D10 0%, #0A0A0A 100%)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: 1,
      }}
    >
      {showNavbar && <Navbar />}
      <div className="w-full 4k:h-full flex items-center justify-start px-5 lg:px-[clamp(16px,5vw,80px)] py-12">
        <div className="sm:max-w-[70ch] flex flex-col gap-4 text-left">
          <h1 className="text-[36px] text-[#EEEEEE] 4k:max-w-[858px] lg:text-[48px] leading-[106%] 4k:text-[64px] tracking-[-2%]">
            {title}
          </h1>
          {description && (
            <p className="text-[#6C6C6C] 4k:text-[24px] text-[16px] leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="absolute 4k:block hidden bottom-0 left-0 w-full h-full bg-[url('/Group2.svg')] bg-cover bg-no-repeat bg-center" />
    </div>
  );
};

export default PageHeader;