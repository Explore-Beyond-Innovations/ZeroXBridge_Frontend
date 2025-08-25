"use client";

import StatusCard from './StatusCard';

export default function SupportPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Support Page</h1>
      <StatusCard onClick={() => console.log('StatusCard clicked!')} />
    </div>
  );
}