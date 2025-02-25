"use client"

import type React from "react"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

const GlowingSvg: React.FC = () => {
  const controls1 = useAnimation()
  const controls2 = useAnimation()
  const controls3 = useAnimation()
  const controls4 = useAnimation()

  useEffect(() => {
    const animatePaths = async () => {
      await Promise.all([
        controls1.start({
          opacity: [0.1, 0.5, 0.1],
          transition: { duration: 3, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
        }),
        controls2.start({
          opacity: [0.2, 0.6, 0.2],
          transition: { duration: 3, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
        }),
        controls3.start({
          opacity: [0.5, 0.8, 0.5],
          transition: { duration: 3, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
        }),
        controls4.start({
          opacity: [0.7, 1, 0.7],
          transition: { duration: 3, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
        }),
      ])
    }

    animatePaths()
  }, [controls1, controls2, controls3, controls4])

  return (
    <svg width="626" height="547" viewBox="0 0 626 547" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_55_7861" fill="white">
        <path d="M626 313C626 271.896 617.904 231.195 602.174 193.22C586.445 155.245 563.389 120.74 534.324 91.6756C505.26 62.6108 470.755 39.5554 432.78 23.8257C394.805 8.09598 354.104 -1.7967e-06 313 0C271.896 1.7967e-06 231.195 8.09599 193.22 23.8257C155.245 39.5554 120.74 62.6108 91.6756 91.6756C62.6108 120.74 39.5554 155.245 23.8257 193.22C8.09598 231.195 -3.5934e-06 271.896 0 313L313 313H626Z" />
      </mask>
      <motion.path
        d="M626 313C626 271.896 617.904 231.195 602.174 193.22C586.445 155.245 563.389 120.74 534.324 91.6756C505.26 62.6108 470.755 39.5554 432.78 23.8257C394.805 8.09598 354.104 -1.7967e-06 313 0C271.896 1.7967e-06 231.195 8.09599 193.22 23.8257C155.245 39.5554 120.74 62.6108 91.6756 91.6756C62.6108 120.74 39.5554 155.245 23.8257 193.22C8.09598 231.195 -3.5934e-06 271.896 0 313L313 313H626Z"
        stroke="url(#paint0_linear_55_7861)"
        strokeWidth="3.11185"
        strokeDasharray="7.78 7.78"
        mask="url(#path-1-inside-1_55_7861)"
        animate={controls1}
      />
      <mask id="path-4-inside-2_55_7861" fill="white">
        <path d="M586.837 352.03C586.837 316.052 579.751 280.426 565.982 247.187C552.214 213.947 532.034 183.745 506.593 158.305C481.153 132.864 450.951 112.684 417.711 98.9157C384.472 85.1475 348.846 78.061 312.868 78.061C276.889 78.061 241.263 85.1475 208.024 98.9157C174.784 112.684 144.582 132.864 119.142 158.305C93.7015 183.745 73.521 213.947 59.7528 247.187C45.9845 280.426 38.8981 316.052 38.8981 352.031L312.868 352.03H586.837Z" />
      </mask>
      <motion.path
        d="M586.837 352.03C586.837 316.052 579.751 280.426 565.982 247.187C552.214 213.947 532.034 183.745 506.593 158.305C481.153 132.864 450.951 112.684 417.711 98.9157C384.472 85.1475 348.846 78.061 312.868 78.061C276.889 78.061 241.263 85.1475 208.024 98.9157C174.784 112.684 144.582 132.864 119.142 158.305C93.7015 183.745 73.521 213.947 59.7528 247.187C45.9845 280.426 38.8981 316.052 38.8981 352.031L312.868 352.03H586.837Z"
        stroke="url(#paint1_linear_55_7861)"
        strokeWidth="3.11185"
        strokeDasharray="7.78 7.78"
        mask="url(#path-4-inside-2_55_7861)"
        animate={controls2}
      />
      <mask id="path-7-inside-3_55_7861" fill="white">
        <path d="M538.275 396.279C538.275 366.112 532.333 336.24 520.788 308.369C509.244 280.498 492.323 255.174 470.991 233.842C449.659 212.511 424.335 195.59 396.464 184.045C368.593 172.5 338.721 166.559 308.554 166.559C278.387 166.559 248.515 172.5 220.644 184.045C192.773 195.59 167.449 212.511 146.117 233.842C124.786 255.174 107.864 280.498 96.3199 308.369C84.7754 336.24 78.8335 366.112 78.8335 396.279L308.554 396.279H538.275Z" />
      </mask>
      <motion.path
        d="M538.275 396.279C538.275 366.112 532.333 336.24 520.788 308.369C509.244 280.498 492.323 255.174 470.991 233.842C449.659 212.511 424.335 195.59 396.464 184.045C368.593 172.5 338.721 166.559 308.554 166.559C278.387 166.559 248.515 172.5 220.644 184.045C192.773 195.59 167.449 212.511 146.117 233.842C124.786 255.174 107.864 280.498 96.3199 308.369C84.7754 336.24 78.8335 366.112 78.8335 396.279L308.554 396.279H538.275Z"
        stroke="url(#paint2_linear_55_7861)"
        strokeWidth="3.11185"
        strokeDasharray="7.78 7.78"
        mask="url(#path-7-inside-3_55_7861)"
        animate={controls3}
      />
      <mask id="path-12-inside-4_55_7861" fill="white">
        <path d="M499.817 434.698C499.817 409.576 494.869 384.699 485.255 361.49C475.642 338.28 461.55 317.191 443.786 299.427C426.022 281.663 404.933 267.571 381.723 257.958C358.514 248.344 333.637 243.396 308.515 243.396C283.393 243.396 258.517 248.344 235.307 257.958C212.097 267.571 191.008 281.663 173.244 299.427C155.48 317.191 141.389 338.28 131.775 361.49C122.161 384.699 117.213 409.576 117.213 434.698L308.515 434.698H499.817Z" />
      </mask>
      <motion.path
        d="M499.817 434.698C499.817 409.576 494.869 384.699 485.255 361.49C475.642 338.28 461.55 317.191 443.786 299.427C426.022 281.663 404.933 267.571 381.723 257.958C358.514 248.344 333.637 243.396 308.515 243.396C283.393 243.396 258.517 248.344 235.307 257.958C212.097 267.571 191.008 281.663 173.244 299.427C155.48 317.191 141.389 338.28 131.775 361.49C122.161 384.699 117.213 409.576 117.213 434.698L308.515 434.698H499.817Z"
        stroke="url(#paint5_linear_55_7861)"
        strokeWidth="2.07456"
        strokeDasharray="7.78 7.78"
        mask="url(#path-12-inside-4_55_7861)"
        animate={controls4}
      />
      {/* Other elements remain unchanged */}
      <defs>
        <linearGradient id="paint0_linear_55_7861" x1="313" y1="0" x2="313" y2="626" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0F0F0" />
          <stop offset="1" stopColor="#A26DFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_55_7861"
          x1="312.868"
          y1="78.061"
          x2="312.868"
          y2="626"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0F0F0" />
          <stop offset="1" stopColor="#A26DFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_55_7861"
          x1="308.554"
          y1="166.559"
          x2="308.554"
          y2="626"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0F0F0" />
          <stop offset="1" stopColor="#A26DFF" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_55_7861"
          x1="308.515"
          y1="243.396"
          x2="308.515"
          y2="626"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0F0F0" />
          <stop offset="1" stopColor="#A26DFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default GlowingSvg
