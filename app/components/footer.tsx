"use client";

import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { useTranslation } from "react-i18next";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Footer = () => {
  const { t } = useTranslation();
  const footerLinks = {
    product: [
      { name: t("footer.aboutUs"), href: "/about" },
      { name: t("footer.faqs"), href: "#" },
      { name: t("footer.documentation"), href: "#" },
      { name: t("footer.prices"), href: "#" },
    ],
    company: [
      { name: t("footer.career"), href: "#" },
      { name: t("footer.contact"), href: "#" },
      { name: t("footer.address"), href: "#" },
      { name: t("footer.developers"), href: "#" },
    ],
    socials: [
      { name: t("footer.telegram"), href: "#" },
      { name: t("footer.twitter"), href: "#" },
      { name: t("footer.discord"), href: "#" },
      { name: t("footer.github"), href: "#" },
    ],
  };

  return (
    <footer
      className="relative w-full h-fit py-[80px] bg-blend-normal"
      style={{
        background: "linear-gradient(180deg, #09050E 21.97%, #48287E 63.69%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden bottom-[-2%] w-full z-0">
        <div
          className="absolute bottom-[10px] lg:bottom-[-1rem] w-full mx-auto"
          style={{
            overflow: "hidden",
            padding: "auto",
            textAlign: "center",
            textWrap: "nowrap",
            fontSize: "clamp(30px, 14.5vw, 225px)",
            lineHeight: "1",
            fontWeight: "700",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(74, 42, 130, 1) 80%, rgba(74, 42, 130, 0.9) 40%, transparent 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            width: "100%",
            letterSpacing: "-0.02em",
            transform: "scale(1.02)",
            position: "absolute",
            // bottom: '1rem',
          }}
        >
          ZEROXBRIDGE
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-0 pt-48 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-24 pt-4 lg:pt-24 pb-4 lg:pb-24">
          {/* Logo and Description Section */}
          <div className="flex-shrink-0 lg:w-1/3">
            <div className="flex items-center space-x-3 mb-8 lg:mb-6">
              <div className="relative h-9 bg-white/10 flex items-center justify-center rounded-sm">
                <Image
                  src="/zerologo.png"
                  alt="ZeroXBridge Logo"
                  width={200}
                  height={29}
                />
              </div>
            </div>
            <p
              className={`${manrope.className} text-[#D4D4D4] text-sm leading-[1.8] max-w-md mb-6 lg:mb-0`}
            >
              {t("footer.description")}
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-16 flex-grow">
            <div>
              <h3
                className={`${manrope.className} text-white font-semibold text-sm mb-2 lg:mb-4`}
              >
                {t("footer.product")}
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`${manrope.className} text-[#D4D4D4] hover:text-white transition-colors text-sm`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className={`${manrope.className} text-white font-semibold text-sm mb-2 lg:mb-4`}
              >
                {t("footer.company")}
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`${manrope.className} text-[#D4D4D4] hover:text-white transition-colors text-sm`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className={`${manrope.className} text-white font-semibold text-sm mb-2 lg:mb-4`}
              >
                {t("footer.socials")}
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {footerLinks.socials.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`${manrope.className} text-[#D4D4D4] hover:text-white transition-colors text-sm`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
