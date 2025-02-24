import LockSummary from "../components/lock-summary";

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <button>open Modal</button>
      <LockSummary />
    </div>
  );
}
