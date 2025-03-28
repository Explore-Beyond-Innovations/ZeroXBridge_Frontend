import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import menumobile from "../../public/menu-mobile.png"

type NavLink = {
  name: string;
  href: string;
};

const navLinks: NavLink[] = [
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Pricing",
    href: "#",
  },
  {
    name: "Features",
    href: "#",
  },
  {
    name: "Contact Us",
    href: "#",
  },
];

const HomeNav = () => {
  return (
    <div className="w-full py-5 bg-[#09050E]">
      <nav className="max-w-screen-2xl px-6 md:px-6 lg:px-10 xl:px-20 flex items-center justify-between mx-auto">
        <Link href="/">
          <div className="logo">
            <Image
              src="/icons/logo.svg"
              alt="Logo"
              width={137}
              height={55}
              className="w-auto h-full cursor-pointer"
            />
          </div>
        </Link>

        {/* Links */}
        <div className="lg:flex items-center hidden gap-10">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-foreground hover:text-purple transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-[#A26DFF]">
          <Image src={menumobile} alt="menu" width={24} height={24} />
        </button>

        {/* Launch App Button - Hidden on Mobile */}
        <Link href="/dashboard" className="hidden lg:block cursor-pointer">
          <Button variant="gradientPrimary" size="default">
            Launch App
          </Button>
        </Link>
      </nav>
    </div>
  );
};

export default HomeNav;
