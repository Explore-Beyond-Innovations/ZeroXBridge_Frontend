"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import GlowingProtractorSVG from "./rippleSVG";

import { motion } from 'framer-motion';

interface Testimonial {
  id: number
  content: string
  author: {
    name: string
    image: string
  }
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "Traditional bridges require moving assets between chains, exposing them to security risks like hacks and exploits. ZeroXBridge eliminates this by keeping your collateral securely locked on Ethereum while unlocking liquidity on Starknet.",
    author: {
      name: "Elon White",
      image: "/images/testimonial-card-profile.png",
    },
  },
  {
    id: 2,
    content:
      "Traditional bridges require moving assets between chains, exposing them to security risks like hacks and exploits. ZeroXBridge eliminates this by keeping your collateral securely locked on Ethereum while unlocking liquidity on Starknet.",
    author: {
      name: "Elon White",
      image: "/images/testimonial-card-profile.png",
    },
  },
  {
    id: 3,
    content:
    "Traditional bridges require moving assets between chains, exposing them to security risks like hacks and exploits. ZeroXBridge eliminates this by keeping your collateral securely locked on Ethereum while unlocking liquidity on Starknet.",
    author: {
      name: "Elon White",
      image: "/images/testimonial-card-profile.png",
    },
  },
  {
    id: 4,
    content:
    "Traditional bridges require moving assets between chains, exposing them to security risks like hacks and exploits. ZeroXBridge eliminates this by keeping your collateral securely locked on Ethereum while unlocking liquidity on Starknet.",
    author: {
      name: "Elon White",
      image: "/images/testimonial-card-profile.png",
    },
  },
]

export default function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="w-[1200px] min-h-[647px] mx-auto bg-[#09050E] relative overflow-hidden rounded-3xl">
      {/* Header */}
      <div className="text-center pt-7 space-y-2 w-[550px] mx-auto">
        <h2 className="text-5xl font-bold bg-howitworks text-transparent leading-[65px] font-manrope bg-clip-text">
          Hear what people are saying about us
        </h2>
        <p className="text-[#D4D4D4] text-xl font-normal font-roboto-serif">Don&apos;t be left out of this Revolution</p>
      </div>

      {/* Floating Profile Images */}
      {mounted && (
          <div className="relative w-[60%] mx-auto h-48 z-10">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-[134px] w-12 h-12 -translate-x-1/2 -translate-y-1/2">
                    <Image
                    src="/images/testimonial-float-1.png"
                    alt=""
                    width={42}
                    height={45}
                    className=""
                    />
                </div>
                <div className="absolute top-10 right-48 w-12 h-12 translate-x-1/2 -translate-y-1/2">
                    <Image
                    src="/testimonial-float-2.png"
                    alt=""
                    width={31}
                    height={34}
                    className=""
                    />
                </div>
                <div className="absolute top-14 left-36 w-12 h-12 -translate-x-1/2 translate-y-1/2">
                    <Image
                    src="/testimonial-float-3.png"
                    alt=""
                    width={34}
                    height={37}
                    className=""
                    />
                </div>
                <div className="absolute top-14 right-16 w-12 h-12 translate-x-1/2 translate-y-1/2">
                    <Image
                    src="/testimonial-float-3.png"
                    alt=""
                    width={25}
                    height={27}
                    className=""
                    />
                </div>
                <div className="absolute top-20 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2">
                    <Image
                    src="/testimonial-float-3.png"
                    alt=""
                    width={31}
                    height={33}
                    className=""
                    />
                </div>
            </div>
          </div>
    
      )}

      {/* Glowing SVG Lines */}
      <div className="absolute top-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <GlowingProtractorSVG />
      </div>

      {/* Testimonial Cards */}
      <div className="absolute bottom-11 w-full px-16">
        <div className="relative h-64 flex justify-center items-center">
          {testimonials.map((testimonial, index) => {
            const offset = (index - currentSlide + testimonials.length) % testimonials.length
            let translateX = "0%"
            let zIndex = 0
            let opacity = 1

            if (offset === 0) {
              zIndex = 3
            } else if (offset === 1 || offset === testimonials.length - 1) {
              translateX = offset === 1 ? "105%" : "-105%"
              zIndex = 2
              opacity = 0.7
            } else {
              translateX = offset === 2 ? "210%" : "-210%"
              zIndex = 1
              opacity = 0.4 
            }

            return (
              <div
                key={testimonial.id}
                className={`absolute w-[488px] h-[233px] border-[0.4px] border-[#8B8B8B] py-4 px-8 bg-grid-pattern rounded-2xl font-roboto-serif ${
                    offset === 0 ? "bg-[#2F1F4C]" : "bg-[#09050E] bg-opacity-60"
                  } backdrop-blur-sm transition-all duration-500 ease-in-out`}
                style={{
                  transform: `translateX(${translateX})`,
                  zIndex,
                  opacity,
                }}
              >
                <Image alt="quotes icon" src={"/images/quotes.svg"} width={32} height={32} className="mt-1 top-4 left-1 absolute " />
                <div className="text-[#D4D4D4] font-normal text-sm mt-[30px] leading-relaxed ">{testimonial.content}</div>
                <div className="flex items-center bottom-4 absolute gap-1">
                  <Image
                    src={testimonial.author.image || "/images/testimonial-card-profile.png"}
                    alt={testimonial.author.name}
                    width={35}
                    height={37}
                    className="rounded-full"
                  />
                  <span className="text-gray-300 text-xs font-normal">{testimonial.author.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Lines */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[0, 1, 2, 3].map((index) => (
            <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-[2px] bg-gray-700`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                <motion.div
                    className="h-full bg-[#A26DFF]"
                    initial={{ width: index === currentSlide ? "100%" : "0%" }}
                    animate={{ width: index === currentSlide ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                />
            </motion.button>
        ))}
      </div>
    </div>
  )
}
