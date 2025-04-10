'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackBanner({ atsScore, atsFeedback }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef();

  useEffect(() => {
    if (!atsFeedback || atsFeedback.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % atsFeedback.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [atsFeedback]);


  // Function to measure text width
  function getTextWidth(text, font = '14px Arial, sans-serif') {
    if (!text) return 0;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
  }
  


  // Measure width of text on every change
  useEffect(() => {
    const font = '14px Arial, sans-serif';
    const width = getTextWidth(atsFeedback?.[currentIndex] || '', font);
    setTextWidth(width);
  }, [currentIndex, atsFeedback]);

  return (
    <motion.div
      animate={{ width: textWidth + 80 }} // 80px buffer for padding, borders etc
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="rounded-full bg-white border-2 border-black py-3 px-5 shadow-md flex flex-col items-center justify-center gap-1 overflow-hidden"
    >
      <div className="flex items-center gap-1">
        <div className="h-full aspect-square rounded-full bg-green-400" />
        <span className="text-sm font-semibold text-black ml-2 text-nowrap">
          ATS Score: {atsScore}%
        </span>
      </div>

      <div className="mt-0.5 h-5 text-sm font-medium text-gray-700 text-center min-w-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={atsFeedback?.[currentIndex] || "feedback-placeholder"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            ref={textRef}
            className="inline-block tex whitespace-nowrap"
          >
            {atsFeedback?.[currentIndex] || ""}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
