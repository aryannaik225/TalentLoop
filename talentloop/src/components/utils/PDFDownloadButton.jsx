'use client';

import { useRef } from "react";

export default function PDFDownloadButton({ resumeId = "resume", filename = "resume.pdf" }) {
  const isDownloading = useRef(false);

  const handleDownload = async () => {
    if (isDownloading.current) return;
    isDownloading.current = true;
  
    try {
      const html2pdf = (await import("html2pdf.js")).default;
  
      const element = document.getElementById(resumeId);
      if (!element) {
        alert("Resume not found!");
        return;
      }
  
      // ✅ Wait for all images inside resume to load
      const images = element.querySelectorAll("img");
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      }));
  
      const opt = {
        margin: 0.5,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true }, // 👈 useCORS is important
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
  
      html2pdf().set(opt).from(element).save();
  
    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      isDownloading.current = false;
    }
  };
  

  return (
    <button
      onClick={handleDownload}
      className="ml-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300"
    >
      📄 Download PDF
    </button>
  );
}
