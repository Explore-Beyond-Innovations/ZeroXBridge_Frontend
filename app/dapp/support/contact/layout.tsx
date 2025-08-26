export default function ContactLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
        {/* This layout overrides the parent dapp layout to remove sidebar */}
        {children}
      </>
    );
  }