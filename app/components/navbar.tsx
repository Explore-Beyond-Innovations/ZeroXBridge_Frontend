import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {}

type NavLink = {
    name: string;
    href: string;
}

const navLinks: NavLink[] = [
    {           
        name: "About Us",
        href: "#",
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

const Navbar = (props: Props) => {
  return (
    <div className="w-full py-5">
        <nav className="max-w-screen-2xl px-2 md:px-6 lg:px-10 xl:px-20 flex items-center justify-between mx-auto">
            <Link href="/">
                <div className="logo">
                    <Image src="/icons/logo.svg" alt="Logo" width={137} height={55} className="w-auto h-full"/>
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

            <Button variant="gradientPrimary" size="default">Launch App</Button>  
        </nav>
    </div>
  )
}

export default Navbar