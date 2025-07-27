import ArrowIcon from "@/app/components/ui/ArrowIcon";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="justify-between  py-4 items-center flex w-full  mx-auto px-[clamp(16px,5vw,80px)] 3xl:px-[18.75rem]">
      <div className="w-12 h-12 flex items-center justify-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>
      </div>
      <nav className="flex items-center gap-6">
        <ul className="flex items-center gap-6">
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
