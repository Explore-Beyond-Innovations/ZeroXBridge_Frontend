const ArrowIcon = ({
  direction,
  ...svgProps
}: React.SVGProps<SVGSVGElement> & {
  direction: "left" | "right" | "up" | "down";
}) => {
  return (
    <svg
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
      className={`${svgProps.className ? svgProps.className + " " : ""}${
        direction === "left"
          ? "rotate-180"
          : direction === "up"
          ? "-rotate-90"
          : direction === "down"
          ? "rotate-90"
          : ""
      }`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.7365 10.9963C18.6509 10.8482 18.5448 10.7087 18.4181 10.5821L14.5394 6.70338C14.1489 6.31286 14.1489 5.6797 14.5394 5.28917C14.93 4.89865 15.5631 4.89865 15.9537 5.28917L19.8323 9.16784C21.3944 10.7299 21.3944 13.2626 19.8323 14.8247L15.9537 18.7034C15.5631 19.0939 14.93 19.0939 14.5394 18.7034C14.1489 18.3129 14.1489 17.6797 14.5394 17.2892L18.4181 13.4105C18.5448 13.2838 18.6509 13.1443 18.7365 12.9963L3.99655 12.9963C3.44426 12.9963 2.99655 12.5486 2.99655 11.9963C2.99655 11.444 3.44426 10.9963 3.99655 10.9963H18.7365Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowIcon;
