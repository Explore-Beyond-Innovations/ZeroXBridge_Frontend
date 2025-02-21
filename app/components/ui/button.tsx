import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#4C327A] text-white hover:bg-opacity-90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        gradientPrimary: [
          "p-[1px] bg-gradient-to-b from-[#A26DFF] to-transparent rounded-full hover:bg-red",
          "shadow-[0px_4px_8px_0px_rgba(194,158,255,0.1)]",
          "shadow-[-0px_-4px_4px_0px_rgba(162,109,255,0.05)]",
          "border-transparent",
          "before:absolute before:inset-0 before:rounded-full before:p-[1px] rounded-full",
        ].join(" "),
      },
      size: {
        default: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    if (variant === 'gradientPrimary') {
      return (
        <button 
          className={cn(buttonVariants({ variant, size, className }))} 
          ref={ref} 
          {...props}
        >
          <span className="block bg-[#4C327A] rounded-full px-10 py-2 h-full w-full">
            {children}
          </span>
        </button>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }