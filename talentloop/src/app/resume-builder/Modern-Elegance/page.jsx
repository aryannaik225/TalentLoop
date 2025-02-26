'use client'

import Navbar from "@/components/authentication-page/Navbar";
import MultiStepForm from "@/components/resume-builder/MultiStepForm";
import { useState } from "react";

export default function Home() {

  const [formIsFilled, setFormIsFilled] = useState(true);

  return (
    <div>
      <Navbar />
      
      {formIsFilled && (
        <div className="fixed w-screen h-screen inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <MultiStepForm />
        </div>
      )}

    </div>
  );
}