'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  "Analyzing your input data...",
  "Drafting a professional summary...",
  "Populating experience & education sections...",
  "Organizing skills into ATS-friendly categories...",
  "Evaluating resume with ATS algorithms...",
  "Almost there... finalizing details!"
];

const optimizationMessages = [
  "ATS score was low. Optimizing resume...",
  "Rewriting summary and experience descriptions...",
  "Improving vocabulary and readability...",
  "Increasing measurable achievements...",
  "Finalizing improved version..."
];

export default function LoadingResumeBar({ isOptimizing }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const steps = isOptimizing ? optimizationMessages : messages;

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 95)); // slowly rise until 95%
      setMessageIndex((prev) => (prev + 1) % steps.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isOptimizing]);

  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-4">
      <motion.div className="w-40 h-4 bg-gray-200 rounded-md overflow-hidden">
        <motion.div
          className="h-full bg-green-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
        />
      </motion.div>
      <p className="text-sm text-white font-medium">
        {isOptimizing ? optimizationMessages[messageIndex] : messages[messageIndex]}
      </p>
    </div>
  );
}
