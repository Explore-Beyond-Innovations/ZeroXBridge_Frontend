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
      style={{
        boxShadow: "0px 0px 9px 0px #434040"
      }}
    >
      {children}
    </div>
  );
};

export default GradientWrapper;
