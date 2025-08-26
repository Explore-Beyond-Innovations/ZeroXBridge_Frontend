import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  icon: string;
  title: string;
  subtitle: string;
  href?: string;
  onClick?: () => void;
};

function SubmitTicketCard({ title, subtitle, icon, href, onClick }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      className="group bg-[#161616] relative rounded-xl w-full max-w-100 h-[481px] p-4 transition-all duration-200 hover:bg-[#1a1a1a] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${title} - ${subtitle}`}
      role="button"
    >
      <div className="absolute top-10 left-10 w-full items-start text-start flex flex-col gap-3.5">
        <p className="text-[#9E9E9E] text-2xl font-normal group-hover:text-white transition-colors">
          {title}
        </p>
        <p className="font-normal text-base text-[#9E9E9E] group-hover:text-gray-300 transition-colors">
          {subtitle}
        </p>
      </div>

      <Image
        src={icon}
        alt="submit_ticket"
        className="absolute bottom-0 left-0 transition-transform duration-200 group-hover:scale-98"
        width={400}
        height={398}
      />
    </button>
  );
}

export default SubmitTicketCard;
