import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center rounded-full justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#4C327A] text-white hover:bg-opacity-90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        gradientPrimary: [
          "relative p-[2px] text-white",
          "before:absolute before:inset-0 before:rounded-full",
          "before:bg-[linear-gradient(20deg,#A26DFF,#4C327A,#A26DFF,#A26DFF)]",
          "before:bg-[length:400%_100%]",
          "before:content-[''] before:z-[0]",
          "before:animate-[rotate_6s_linear_infinite]", 
          "after:absolute after:inset-[2px] after:rounded-full",
          "after:bg-[#4C327A] after:z-[1]",
        ].join(" "),
      },
      size: {
        default: "h-12",
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
          <span className="relative z-[2] flex items-center justify-center px-10 py-2 h-full w-full">
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