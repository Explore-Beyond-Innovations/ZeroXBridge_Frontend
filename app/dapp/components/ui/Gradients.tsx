// across the design we have these occurences of gradient-like
// patterns on elements appearing like a border.
// in this file, we'll keep a couple of them here.
// either in dark or light theme
export type GradientDirection = "to-right" | "to-left" | "to-top" | "to-bottom";

interface GradientWrapperProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  padding?: string;
  /** The direction of the gradient.
   * Can be: "to-right" | "to-left" | "to-top" | "to-bottom"
   */
  gradientDirection?: GradientDirection;
}

export const GradientWrapperPrimary = ({
  children,
  className = "",
  borderRadius = "rounded-xl",
  padding = "p-[2px]",
  gradientDirection = "to-right",
}: GradientWrapperProps) => {
  let gradientClass = "bg-gradient-to-r";

  switch (gradientDirection) {
    case "to-left":
      gradientClass = "bg-gradient-to-l";
      break;
    case "to-top":
      gradientClass = "bg-gradient-to-t";
      break;
    case "to-bottom":
      gradientClass = "bg-gradient-to-b";
      break;
    case "to-right":
    default:
      gradientClass = "bg-gradient-to-r";
      break;
  }

  return (
    <div
      className={`${padding} ${borderRadius} ${gradientClass} from-[var(--primary-border)] to-[var(--toggle-slider-bg)] ${className}`}
    >
      {children}
    </div>
  );
};
