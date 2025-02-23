'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'About Us', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Prices', href: '#' },
    ],
    company: [
      { name: 'Career', href: '#' },
      { name: 'Contact US', href: '#' },
      { name: 'Address', href: '#' },
      { name: 'Developers', href: '#' },
    ],
    socials: [
      { name: 'Telegram', href: '#' },
      { name: 'Twitter', href: '#' },
      { name: 'Discord', href: '#' },
      { name: 'Github', href: '#' },
    ],
  }

  return (
    <footer className="relative w-full bg-black">

      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, rgba(9, 5, 14, 1) 0%, rgba(74, 42, 130, 1) 100%)',
          position: 'absolute',
          bottom: '-20%',
        }}
      />

      <div className="absolute inset-0 overflow-hidden bottom-[-20%] w-full z-0 style={{ height: '100%', bottom: 0 }}">
        <div 
          className="absolute bottom-[-20] w-full text-center"
          style={{
            minWidth: '100vw',
            overflow: 'hidden',
            fontSize: '240px',
            lineHeight: '1',
            fontWeight: '700',  
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(74, 42, 130, 1) 80%, rgba(74, 42, 130, 0.9) 40%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            width: '100%',
            letterSpacing: '-0.02em',
            transform: 'scale(1.2)',
            position: 'absolute',
          }}
        >
          ZEROXBRIDGE
        </div>
      </div> 

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-24 pb-24">
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-10">
              <div className="relative h-9 bg-white/10 flex items-center justify-center rounded-sm">
                <Image
                  src="/zerologo.png"
                  alt="ZeroXBridge Logo"
                  width={200}
                  height={29}
                />
              </div>
            </div>
            <p className={`${manrope.className} text-[#D4D4D4] text-sm leading-[1.8] max-w-md mb-16 `}> 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Nunc vulputate libero et velit interdum, ac aliquet odio 
              mattis. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:ml-32 md:ml-40 lg:ml-52">
              <div>
                <h3 className={`${manrope.className} text-white font-semibold text-sm mb-3`}>
                  PRODUCT
                </h3>
                <ul className="space-y-2">
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
                <h3 className={`${manrope.className} text-white font-semibold text-sm mb-3`}>
                  COMPANY
                </h3>
                <ul className="space-y-2">
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
                <h3 className={`${manrope.className} text-white font-semibold text-sm mb-3`}>
                  SOCIALS
                </h3>
                <ul className="space-y-2">
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
      </div>
    </footer>
  )
}

export default Footer