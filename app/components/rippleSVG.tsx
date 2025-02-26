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
    
    const startRippleSequence = async () => {
      // Reset all controls to starting opacity before each sequence
      controls1.set({ opacity: 0.2 }) // Outermost (lowest initial opacity)
      controls2.set({ opacity: 0.4 })
      controls3.set({ opacity: 0.6 })
      controls4.set({ opacity: 1 }) // Innermost (highest initial opacity)
      
      // Start with innermost circle (controls4) completely disappearing
      await controls4.start({ 
        opacity: [1, 0, 0], 
        transition: { duration: 1.5, ease: "easeOut" } 
      })
      
      // Second ring now pulses dramatically (appearing and fading)
      await controls3.start({ 
        opacity: [0.6, 1, 0.2], 
        transition: { duration: 1.5, ease: "easeInOut" } 
      })
      
      // Third ring pulses next
      await controls2.start({ 
        opacity: [0.4, 1, 0.2], 
        transition: { duration: 1.5, ease: "easeInOut" } 
      })
      
      // Outermost ring completes the ripple effect
      await controls1.start({ 
        opacity: [0.2, 0.8, 0.2], 
        transition: { duration: 1.5, ease: "easeInOut" } 
      })
      
      // Reset the innermost ring to prepare for next sequence
      await controls4.start({ 
        opacity: 1, 
        transition: { duration: 0.5, ease: "easeIn" } 
      })
    }

    // Start the sequence immediately
    startRippleSequence()
    
    // Then repeat it at intervals
    const interval = setInterval(startRippleSequence, 6500) // Shortened interval for more frequent ripples
    return () => clearInterval(interval)
  }, [controls1, controls2, controls3, controls4])

  return (
    <svg width="626" height="547" viewBox="0 0 626 547" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_55_7861" fill="white">
        <path d="M626 313C626 271.896 617.904 231.195 602.174 193.22C586.445 155.245 563.389 120.74 534.324 91.6756C505.26 62.6108 470.755 39.5554 432.78 23.8257C394.805 8.09598 354.104 -1.7967e-06 313 0C271.896 1.7967e-06 231.195 8.09599 193.22 23.8257C155.245 39.5554 120.74 62.6108 91.6756 91.6756C62.6108 120.74 39.5554 155.245 23.8257 193.22C8.09598 231.195 -3.5934e-06 271.896 0 313L313 313H626Z" />
      </mask>
      <motion.path
        d="M626 313C626 271.896 617.904 231.195 602.174 193.22C586.445 155.245 563.389 120.74 534.324 91.6756C505.26 62.6108 470.755 39.5554 432.78 23.8257C394.805 8.09598 354.104 -1.7967e-06 313 0C271.896 1.7967e-06 231.195 8.09599 193.22 23.8257C155.245 39.5554 120.74 62.6108 91.6756 91.6756C62.6108 120.74 39.5554 155.245 23.8257 193.22C8.09598 231.195 -3.5934e-06 271.896 0 313L313 313H626Z"
        stroke="url(#paint0_linear_55_7861)"
        strokeOpacity="0.5"
        strokeWidth="3.11185"
        strokeDasharray="7.78 7.78"
        mask="url(#path-1-inside-1_55_7861)"
        animate={controls1}
      />
      <g filter="url(#filter0_d_55_7861)">
        <circle cx="46.1684" cy="151.592" r="2.54472" fill="white" />
      </g>
      <g filter="url(#filter1_f_55_7861)">
        <circle cx="46.1684" cy="151.592" r="4.7259" fill="#A26DFF" />
      </g>
      <mask id="path-4-inside-2_55_7861" fill="white">
        <path d="M586.837 352.03C586.837 316.052 579.751 280.426 565.982 247.187C552.214 213.947 532.034 183.745 506.593 158.305C481.153 132.864 450.951 112.684 417.711 98.9157C384.472 85.1475 348.846 78.061 312.868 78.061C276.889 78.061 241.263 85.1475 208.024 98.9157C174.784 112.684 144.582 132.864 119.142 158.305C93.7015 183.745 73.521 213.947 59.7528 247.187C45.9845 280.426 38.8981 316.052 38.8981 352.031L312.868 352.03H586.837Z" />
      </mask>
      <motion.path
        d="M586.837 352.03C586.837 316.052 579.751 280.426 565.982 247.187C552.214 213.947 532.034 183.745 506.593 158.305C481.153 132.864 450.951 112.684 417.711 98.9157C384.472 85.1475 348.846 78.061 312.868 78.061C276.889 78.061 241.263 85.1475 208.024 98.9157C174.784 112.684 144.582 132.864 119.142 158.305C93.7015 183.745 73.521 213.947 59.7528 247.187C45.9845 280.426 38.8981 316.052 38.8981 352.031L312.868 352.03H586.837Z"
        stroke="url(#paint1_linear_55_7861)"
        strokeOpacity="0.7"
        strokeWidth="3.11185"
        strokeDasharray="7.78 7.78"
        mask="url(#path-4-inside-2_55_7861)"
        animate={controls2}
      />
      <g filter="url(#filter2_d_55_7861)">
        <circle cx="79.3465" cy="210.75" r="2.22739" fill="white" />
      </g>
      <g filter="url(#filter3_f_55_7861)">
        <circle cx="79.3465" cy="210.75" r="4.13659" fill="#A26DFF" />
      </g>
      <mask id="path-7-inside-3_55_7861" fill="white">
        <path d="M538.275 396.279C538.275 366.112 532.333 336.24 520.788 308.369C509.244 280.498 492.323 255.174 470.991 233.842C449.659 212.511 424.335 195.59 396.464 184.045C368.593 172.5 338.721 166.559 308.554 166.559C278.387 166.559 248.515 172.5 220.644 184.045C192.773 195.59 167.449 212.511 146.117 233.842C124.786 255.174 107.864 280.498 96.3199 308.369C84.7754 336.24 78.8335 366.112 78.8335 396.279L308.554 396.279H538.275Z" />
      </mask>
      <motion.path
        d="M538.275 396.279C538.275 366.112 532.333 336.24 520.788 308.369C509.244 280.498 492.323 255.174 470.991 233.842C449.659 212.511 424.335 195.59 396.464 184.045C368.593 172.5 338.721 166.559 308.554 166.559C278.387 166.559 248.515 172.5 220.644 184.045C192.773 195.59 167.449 212.511 146.117 233.842C124.786 255.174 107.864 280.498 96.3199 308.369C84.7754 336.24 78.8335 366.112 78.8335 396.279L308.554 396.279H538.275Z"
        stroke="url(#paint2_linear_55_7861)"
        strokeOpacity="0.9"
        strokeWidth="3.11185"
        strokeDasharray="7.78 7.78"
        mask="url(#path-7-inside-3_55_7861)"
        animate={controls3}
      />
      <g filter="url(#filter4_d_55_7861)">
        <circle cx="112.915" cy="277.817" r="1.86765" fill="white" />
        <circle
          cx="112.915"
          cy="277.817"
          r="1.60084"
          stroke="url(#paint3_linear_55_7861)"
          strokeOpacity="0.9"
          strokeWidth="0.533613"
          strokeDasharray="7.78 7.78"
        />
      </g>
      <g filter="url(#filter5_f_55_7861)">
        <circle cx="112.915" cy="277.817" r="3.46849" fill="#A26DFF" />
        <circle
          cx="112.915"
          cy="277.817"
          r="3.20168"
          stroke="url(#paint4_linear_55_7861)"
          strokeOpacity="0.9"
          strokeWidth="0.533613"
          strokeDasharray="7.78 7.78"
        />
      </g>
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
      <g filter="url(#filter6_d_55_7861)">
        <circle cx="145.569" cy="336.047" r="1.5553" fill="white" />
        <circle
          cx="145.569"
          cy="336.047"
          r="1.33312"
          stroke="url(#paint6_linear_55_7861)"
          strokeWidth="0.444372"
          strokeDasharray="7.78 7.78"
        />
      </g>
      <g filter="url(#filter7_f_55_7861)">
        <circle cx="145.569" cy="336.047" r="2.88842" fill="#A26DFF" />
        <circle
          cx="145.569"
          cy="336.047"
          r="2.66623"
          stroke="url(#paint7_linear_55_7861)"
          strokeWidth="0.444372"
          strokeDasharray="7.78 7.78"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_55_7861"
          x="40.7154"
          y="146.139"
          width="10.9059"
          height="10.9058"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.45412" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.635929 0 0 0 0 0.426053 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_55_7861" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_55_7861" result="shape" />
        </filter>
        <filter
          id="filter1_f_55_7861"
          x="37.0801"
          y="142.504"
          width="18.1765"
          height="18.1764"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.18118" result="effect1_foregroundBlur_55_7861" />
        </filter>
        <filter
          id="filter2_d_55_7861"
          x="74.5735"
          y="205.977"
          width="9.54597"
          height="9.54577"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.2728" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.635929 0 0 0 0 0.426053 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_55_7861" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_55_7861" result="shape" />
        </filter>
        <filter
          id="filter3_f_55_7861"
          x="71.3916"
          y="202.795"
          width="15.91"
          height="15.9097"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1.90919" result="effect1_foregroundBlur_55_7861" />
        </filter>
        <filter
          id="filter4_d_55_7861"
          x="108.913"
          y="273.815"
          width="8.0042"
          height="8.00426"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.06723" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.635929 0 0 0 0 0.426053 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_55_7861" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_55_7861" result="shape" />
        </filter>
        <filter
          id="filter5_f_55_7861"
          x="106.245"
          y="271.147"
          width="13.3403"
          height="13.3404"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1.60084" result="effect1_foregroundBlur_55_7861" />
        </filter>
        <filter
          id="filter6_d_55_7861"
          x="142.237"
          y="332.714"
          width="6.66558"
          height="6.66582"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.888744" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.635929 0 0 0 0 0.426053 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_55_7861" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_55_7861" result="shape" />
        </filter>
        <filter
          id="filter7_f_55_7861"
          x="140.015"
          y="330.492"
          width="11.1093"
          height="11.1093"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1.33312" result="effect1_foregroundBlur_55_7861" />
        </filter>
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
          id="paint3_linear_55_7861"
          x1="112.915"
          y1="275.95"
          x2="112.915"
          y2="279.685"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0F0F0" />
          <stop offset="1" stopColor="#A26DFF" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_55_7861"
          x1="112.915"
          y1="274.349"
          x2="112.915"
          y2="281.286"
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
        <linearGradient
          id="paint6_linear_55_7861"
          x1="145.569"
          y1="334.492"
          x2="145.569"
          y2="337.602"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0F0F0" />
          <stop offset="1" stopColor="#A26DFF" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_55_7861"
          x1="145.569"
          y1="333.159"
          x2="145.569"
          y2="338.936"
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
