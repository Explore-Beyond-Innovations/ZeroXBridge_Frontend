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
          "p-[2px] bg-gradient-to-b from-[#A26DFF] to-transparent text-white transition-all rounded-full hover:bg-none",
          "border-transparent",
          "before:absolute before:inset-0 before:rounded-full before:p-[1px] rounded-full",
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
          <span className="bg-[#4C327A] rounded-full flex align-center items-center px-10 py-2 h-full w-full">
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