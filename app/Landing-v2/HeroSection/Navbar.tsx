import ArrowIcon from "@/app/components/ui/ArrowIcon";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="justify-between  py-4 items-center flex w-full max-w-[1440px] mx-auto px-4">
      <div className="w-12 h-12 flex items-center justify-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="#">App</Link>
          </li>
          <li>
            <Link href="#">Docs</Link>
          </li>
          <li>
            <Link href="#">Docs</Link>
          </li>
          <li>
            <Link href="#">Community</Link>
          </li>
          <li>
            <Link href="#">Blog</Link>
          </li>
          <li>
            <Link href="#">X/Twitter</Link>
          </li>
        </ul>
        <button className="bg-white text-base  rounded-full text-black px-3 py-1.5 flex items-center gap-2">
          Launch App
          <ArrowIcon direction="right" />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
