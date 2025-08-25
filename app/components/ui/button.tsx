"use client";

import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Simple cn function without external dependencies
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple button variants without cva dependency
const getButtonClasses = (variant: string = "default", size: string = "default") => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50"
  
  const variantClasses = {
    default: "bg-[#a26dff] text-white shadow hover:bg-[#907DBD]",
    destructive: "bg-red-600 text-white shadow hover:bg-red-700",
    outline: "border border-[#a26dff] bg-transparent text-[#a26dff] hover:bg-[#a26dff] hover:text-white",
    secondary: "bg-gray-600 text-white shadow hover:bg-gray-700",
    ghost: "hover:bg-[#a26dff]/20 hover:text-[#a26dff]",
    link: "text-[#a26dff] underline-offset-4 hover:underline",
  }
  
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md gap-1.5 px-3",
    lg: "h-10 rounded-md px-6",
    icon: "size-9",
  }
  
  return cn(
    baseClasses,
    variantClasses[variant as keyof typeof variantClasses] || variantClasses.default,
    sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default
  )
}

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? "span" : "button" // Simplified, no Slot dependency

  return (
    <Comp
      className={cn(getButtonClasses(variant, size), className)}
      {...props}
    />
  )
}

export { Button, type ButtonProps }

