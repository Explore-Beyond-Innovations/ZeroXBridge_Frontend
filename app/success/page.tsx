"use client";
import React, { useState } from "react";
import SuccessState from "../components/success-state/success-state";
import AnimatedIcon from "../components/success-state/animated-icon";
import { useTheme } from "../ThemeContext";
import Navbar from "../components/navbar";

const Success = () => {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className="">
        <SuccessState
          isOpen={open}
          onClose={setOpen}
          message={"You have successfully LOCKED $200 xZB Tokens."}
          isDarkMode={isDarkMode}
          icon={<AnimatedIcon iconType="lock" />}
        />
        <button
          onClick={() => setOpen(true)}
          className="text-black mt-[12rem] bg-black text-white rounded-full px-4 py-3"
        >
          Click to open success state
        </button>
      </div>
    </>
  );
};

export default Success;
