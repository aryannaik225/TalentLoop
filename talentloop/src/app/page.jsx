'use client'

import React, { useEffect, useState } from "react";
import Navbar from "../components/landing-page/Navbar";


export default function Home() {

  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setCirclePosition({ x, y });
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="relative w-screen h-auto min-h-screen bg-[#2A2929]">
      <div className="relative w-screen h-full landing-page-bg"/>
      {/* <div className="absolute w-72 h-72 bg-[#38BE23] opacity-30 rounded-full top-[219px] left-[138px] blur-[120px]" /> */}
      <div
        className="hidden md:block z-0 absolute bg-[#46F1A6] opacity-30 rounded-full blur-[100px] transition-all ease-linear duration-75"
        style={{
          width: "200px",
          height: "200px",
          left: `${circlePosition.x - 100}px`,
          top: `${circlePosition.y - 100}px`,
          pointerEvents: "none",
        }}
      />
      {/* <div className="absolute w-96 h-96 bg-[#A6B331] opacity-30 rounded-full top-[74px] right-[173px] blur-[140px]" /> */}
      <div className="z-10">
      <Navbar setShowProfile={setShowProfile} /> 
      </div>
    </div>
  );
}
