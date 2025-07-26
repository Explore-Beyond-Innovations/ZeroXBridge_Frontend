interface GradientWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-[url('/border.svg')] bg-center bg-cover bg-no-repeat p-[1px] inline-block ${className}`}
    >
      {children}
    </div>
  );
};

export default GradientWrapper;
