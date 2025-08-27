"use client";
import React from "react";
import { GuidesCard } from "./components";
import StatusCard from "./components/StatusCard";

export default function SupportPage() {
  return (
    <div className="space-y-6 p-6">
      <h1>Support</h1>
      <div className="grid-cols-3 w-full gap-6 grid">
        <GuidesCard />
        <StatusCard />
      </div>
    </div>
  );
}
