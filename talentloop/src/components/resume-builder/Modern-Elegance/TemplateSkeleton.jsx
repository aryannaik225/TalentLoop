'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SkeletonBlock = ({ width, height, className }) => (
  <motion.div
    initial={{ opacity: 0.4 }}
    animate={{ opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className={`bg-gray-300 rounded-full ${className}`}
    style={{ width, height }}
  />
);

const TemplateSkeleton = () => {
  return (
    <div className='max-w-2xl mx-auto py-8 px-10 bg-[#f0f0f0] shadow-lg border border-gray-300 rounded-lg relative flex flex-col overflow-hidden'>

      {/* Profile and Contact Info */}
      <div className='flex w-full justify-between items-center z-10 relative mt-12'>
        <SkeletonBlock width="5rem" height="5rem" className="rounded-full" />
        <div className='flex flex-col items-start gap-2 text-right'>
          <SkeletonBlock width="8rem" height="1rem" />
          <SkeletonBlock width="8rem" height="1rem" />
          <SkeletonBlock width="8rem" height="1rem" />
        </div>
      </div>

      {/* About Section */}
      <div className='flex w-full mt-12 relative z-10'>
        <SkeletonBlock width="2rem" height="11rem" />
        <div className='flex flex-col w-full items-start pl-10'>
          <SkeletonBlock width="8rem" height="2rem" />
          <SkeletonBlock width="8rem" height="1rem" className="mt-1" />
          <SkeletonBlock width="100%" height="0.75rem" className="mt-4" />
          <SkeletonBlock width="100%" height="0.75rem" className="mt-1" />
          <SkeletonBlock width="100%" height="0.75rem" className="mt-1" />
          <SkeletonBlock width="10rem" height="0.75rem" className="mt-1" />
        </div>
      </div>

      {/* Experience Section */}
      <div className='flex w-full mt-12 relative z-10'>
        <SkeletonBlock width="2rem" height="11rem" />
        <div className='flex flex-col w-full pl-10 items-start gap-3'>
          <SkeletonBlock width="8rem" height="2rem" />
          <SkeletonBlock width="8rem" height="1rem" className="mt-1" />
          <SkeletonBlock width="100%" height="0.75rem" className="mt-4" />
          <SkeletonBlock width="100%" height="0.75rem" className="mt-1" />
          <SkeletonBlock width="100%" height="0.75rem" className="mt-1" />
          <SkeletonBlock width="10rem" height="0.75rem" className="mt-1" />
        </div>
      </div>

      {/* Education and Skills Sections */}
      <div className="flex w-full mt-12 relative z-10 justify-between">
        {/* Education */}
        <div className="flex w-5/12">
          <SkeletonBlock width="2rem" height="11rem" />
          <div className="flex flex-col w-full pl-10 items-start gap-6">
            <SkeletonBlock width="8rem" height="2rem" />
            <SkeletonBlock width="8rem" height="1rem" />
            <SkeletonBlock width="100%" height="0.75rem" className="mt-4" />
            <SkeletonBlock width="100%" height="0.75rem" className="mt-1" />
            <SkeletonBlock width="100%" height="0.75rem" className="mt-1" />
            <SkeletonBlock width="10rem" height="0.75rem" className="mt-1" />
          </div>
        </div>

        {/* Skills */}
        <div className="flex w-6/12">
          <SkeletonBlock width="2rem" height="11rem" />
          <div className="flex flex-col w-full pl-10 items-start gap-6">
            <SkeletonBlock width="8rem" height="2rem" />
            <SkeletonBlock width="8rem" height="1rem" />
            <SkeletonBlock width="100%" height="0.75rem" className="mt-4" />
            <SkeletonBlock width="100%" height="0.75rem" className="mt-1" />
            <SkeletonBlock width="100%" height="0.75rem" className="mt-1" />
            <SkeletonBlock width="10rem" height="0.75rem" className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSkeleton;
