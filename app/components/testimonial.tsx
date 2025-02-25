"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from 'framer-motion';

interface Testimonial {
  id: number
  content: string
  author: {
    name: string
    image: string
  }
}

const glowAnimation = {
    initial: { strokeOpacity: 0.3 },
    animate: {
      strokeOpacity: [0.3, 1, 0.3],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
    }}

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

const profileImages = [
  "/images/testimonial-float-1.png",
  "/images/testimonial-card-profile.png",
  "/images/testimonial-card-profile.png",
  "/images/testimonial-card-profile.png",
  "/images/testimonial-card-profile.png",
]

export default function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="w-[1200px] h-[647px] mx-auto bg-[#09050E] relative overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="text-center pt-16 space-y-4 w-[550px] mx-auto">
        <h2 className="text-5xl font-bold bg-howitworks text-transparent leading-[65px] font-manrope bg-clip-text">
          Hear what people are saying about us
        </h2>
        <p className="text-[#D4D4D4] text-xl font-normal font-roboto-serif">Don't be left out of this Revolution</p>
      </div>

      {/* Floating Profile Images */}
      {mounted && (
        <div className="absolute w-full top-48">
          <div className="relative w-full h-32">
            {profileImages.map((image, index) => {
              const radius = 500 // Arc radius
              const totalImages = profileImages.length
              const angle = (Math.PI / (totalImages + 1)) * (index + 1)
              const x = 50 + (Math.sin(angle) * radius) / 12
              const y = Math.cos(angle) * (radius / 8)

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${x}%`,
                    top: `${y}px`,
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-purple-500/20 rounded-full blur-sm" />
                    <Image
                      src={image || "/placeholder.svg"}
                      alt=""
                      width={48}
                      height={48}
                      className="relative rounded-full border-2 border-purple-500/20"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Glowing SVG Lines */}
      <svg
      width="300"
      height="150"
      viewBox="0 0 300 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer arc */}
      <motion.path
        d="M 20 130 A 110 110 0 0 1 280 130"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="5,5"
        variants={glowAnimation}
        initial="initial"
        animate="animate"
      />
      
      {/* Inner arc */}
      <motion.path
        d="M 50 130 A 80 80 0 0 1 250 130"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="5,5"
        variants={glowAnimation}
        initial="initial"
        animate="animate"
      />
      
      {/* Bottom base line */}
      <motion.line
        x1="20"
        y1="130"
        x2="280"
        y2="130"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="5,5"
        variants={glowAnimation}
        initial="initial"
        animate="animate"
      />
    </svg>

      

      {/* Testimonial Cards */}
      <div className="absolute bottom-14 w-full px-16">
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
                className={`absolute w-[488px] h-[233px] border-[0.5px] border-[#8B8B8B] py-4 px-8 bg-grid-pattern rounded-2xl font-roboto-serif bg-[#1A1A1F]/60 backdrop-blur-sm transition-all duration-500 ease-in-out`}
                style={{
                  transform: `translateX(${translateX})`,
                  zIndex,
                  opacity,
                }}
              >
                <Image alt="quotes icon" src={"/images/quotes.svg"} width={32} height={32} className="mt-1 top-4 left-1 absolute " />
                <div className="text-[#D4D4D4] font-normal text-sm mt-[30px] leading-relaxed ">{testimonial.content}</div>
                <div className="flex items-center bottom-4 absolute gap-3">
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-[1.4px] transition-all duration-300 
              ${index === currentSlide ? "bg-[#A26DFF]" : "bg-[#505050]"}`}
          />
        ))}
      </div>
    </div>
  )
}
