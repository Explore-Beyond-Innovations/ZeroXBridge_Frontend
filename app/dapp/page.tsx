"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Preloader from "./components/ui/Preloader";

const Page = () => {
  const [showPreloader] = useState(true);
  const navigate = useRouter();

  if (showPreloader) {
    return (
      <Preloader
        onComplete={() => {
          navigate.push('/dapp/dashboard');
        }}
      />
    );
  }

  return null;
};

export default Page;
