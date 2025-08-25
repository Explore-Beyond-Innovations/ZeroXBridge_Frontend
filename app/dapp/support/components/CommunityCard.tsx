import Image from "next/image";

export const CommunityCard = () => {
  return (
    <div className="relative w-full md:w-[400px] h-[481px] max-h-[481px] bg-support-card-bg rounded-[1rem] p-10 overflow-hidden">
      <a
        href="https://t.me/ZeroXBridge1"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="w-full h-full">
          {/* Text content */}
          <div className="space-y-3.5 text-support-card-text font-inter relative z-10">
            <h5 className="font-normal text-2xl leading-[1.2em]">Community</h5>
            <p className="font-normal text-sm leading-[1.2em]">
              Join Our Discord and Telegram Community
            </p>
          </div>
          {/* Background image */}
          <div className="absolute inset-0 flex items-end justify-center opacity-70">
            <Image
              src="/community-image.png"
              alt="community card image"
              width={450}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      </a>
    </div>
  );
};
