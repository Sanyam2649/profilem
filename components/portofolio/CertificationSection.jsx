"use client";

import { Award, Calendar, ExternalLink, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CertificationsSection({ certifications }) {
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  const formatDate = (d) => {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Check if scrolling is needed
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const isScrollable = el.scrollWidth > el.clientWidth;
    setShowArrows(isScrollable);

    const handleResize = () => {
      setShowArrows(el.scrollWidth > el.clientWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [certifications]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="w-full py-20">
      <div className="px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white shadow-sm border rounded-xl">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700">
              Verified Credentials
            </span>
          </div>

          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Certifications
          </h2>
        </div>

        {/* NAVIGATION BUTTONS */}
        {showArrows && (
          <div className="flex justify-end gap-3 mb-4">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {/* SCROLLABLE CARDS */}
        <div
          ref={scrollRef}
          className="
            flex gap-6 overflow-x-auto scrollbar-none
            snap-x snap-mandatory pb-4 justify-center
          "
        >
          {certifications.map((cert) => (
            <div key={cert._id} className="snap-center w-[300px] flex-shrink-0">
              <CertificationCard cert={cert} formatDate={formatDate} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


function CertificationCard({ cert, formatDate }) {
  return (
    <div
      className="
        bg-[#faf9f6]
        rounded-2xl
        p-8
        border border-[#d8d3c3]
        shadow-[0_0_20px_rgba(0,0,0,0.05)]
        hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]
        transition-all
        flex flex-col
        h-full
        min-h-[340px]     /* ensures consistent height */
      "
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/white-paper.png')",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div
          className="
            w-14 h-14 rounded-xl
            bg-gradient-to-br from-indigo-600 to-indigo-800
            flex items-center justify-center text-white shadow-md
            flex-shrink-0
          "
        >
          <Award className="w-7 h-7" />
        </div>

        <span
          className="
            text-xs font-semibold px-3 py-1 rounded-full
            bg-indigo-50 border border-indigo-200 text-indigo-700
            max-w-[120px]
            truncate
          "
        >
          {cert.issuer}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        {/* TITLE with clamp */}
        <h3
          className="
            text-xl font-bold text-gray-900 leading-snug mb-3
            line-clamp-2
            min-h-[48px] /* keeps height stable even if title is short */
          "
        >
          {cert.name}
        </h3>

        {/* DETAILS */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-700" />
            <span>Issued {formatDate(cert.issueDate)}</span>
          </div>
        </div>
      </div>

      {/* FOOTER (always fixed position) */}
      <div className="mt-6 pt-4 border-t border-[#e2ddd0]">
        {cert.link ? (
          <a
            href={cert.link}
            target="_blank"
            className="
              flex justify-center items-center gap-2
              px-4 py-2 rounded-xl
              bg-indigo-600 text-white font-semibold text-sm
              hover:bg-indigo-700 transition
              text-center
              w-full
            "
          >
            Verify Certificate
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <p className="text-center text-gray-500 text-sm">
            Verified Credential
          </p>
        )}
      </div>
    </div>
  );
}