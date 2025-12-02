'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, X, Sparkles, Download } from 'lucide-react';
import Image from 'next/image';

import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectSection';
import SkillsSection from './SkillsSection';
import CertificationsSection from './CertificationSection';
import ProfileHeader from './ProfileHeader';
import CustomSection from './CustomSection';

import BackgroundImage from '@/public/Projects Page.png';
export default function PortfolioClient({ profileId }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* -----------------------------
     FETCH PROFILE
  ------------------------------*/
  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`/api/profile/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId }),
        cache: 'no-store',
      });

      if (!res.ok) throw new Error('Failed to load profile');
      const data = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 120));

      setProfile(data?.profile || null);
    } catch (err) {
      setError(err.message || 'Error loading profile');
    } finally {
      setIsLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /* -----------------------------
     SCROLL PROGRESS
  ------------------------------*/
  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(height > 0 ? (top / height) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* -----------------------------
     NORMALIZE KEYS
  ------------------------------*/
  const normalize = (key) => {
    if (key === 'customFields') return 'customSections';
    if (key === 'certifications') return 'certification';
    return key;
  };

  const getOrderedSections = () => {
    const order = profile.sectionOrder ?? [];
    const normalized = order.map(normalize);

    const allKeys = [
      'personal',
      'education',
      'experience',
      'projects',
      'skills',
      'certification',
      'customSections',
    ];

    const leftovers = allKeys.filter((key) => !normalized.includes(key));
    return [...normalized, ...leftovers];
  };

  /* -----------------------------
     LOADING UI
  ------------------------------*/
  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-white animate-spin" />
        </div>
      </div>
    );

  if (!profile || error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center mb-4">
          <X className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Portfolio Unavailable</h1>
        <p className="text-gray-600">{error || 'Profile not found'}</p>
      </div>
    );

  const orderedSections = getOrderedSections();

  /* -----------------------------
     SECTION VISIBILITY CHECK
  ------------------------------*/
  const has = {
    personal: Boolean(profile.personal),
    education: profile.education?.length > 0,
    experience: profile.experience?.length > 0,
    projects: profile.projects?.length > 0,
    skills: profile.skills?.length > 0,
    certification: profile.certification?.length > 0,
    customSections: profile.customSections?.length > 0,
  };

  const sectionMap = {
    personal: has.personal ? (
      <ProfileHeader profile={profile.personal} />
    ) : null,

    education: has.education ? (
      <EducationSection education={profile.education} />
    ) : null,

    experience: has.experience ? (
      <ExperienceSection experiences={profile.experience} />
    ) : null,

    projects: has.projects ? (
      <ProjectsSection projects={profile.projects} />
    ) : null,

    skills: has.skills ? (
      <SkillsSection skills={profile.skills} />
    ) : null,

    certification: has.certification ? (
      <CertificationsSection certifications={profile.certification} />
    ) : null,

    customSections: has.customSections ? (
      <div className="space-y-12">
        {profile.customSections.map((sec) => (
          <CustomSection key={sec._id} section={sec} />
        ))}
      </div>
    ) : null,
  };

  const rawSections = orderedSections.map((key) => sectionMap[key]).filter(Boolean);

  /* -----------------------------
     ANIMATION + BACKGROUND LOGIC
     Alternate backgrounds starting from section 1 (index 1)
  ------------------------------*/
const renderSection = (section, index) => {
  const showBg = index % 2 === 1;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative py-10"
    >
      {showBg && (
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src={BackgroundImage}
            alt="section background"
            fill
            priority
            placeholder="empty"
            quality={100}
            className="object-cover object-center"
          />
        </div>
      )}

      {section}
    </motion.div>
  );
};


  /* -----------------------------
     FINAL UI
  ------------------------------*/
  return (
    <div className="relative min-h-screen bg-[#222831]">

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-40">
        <div
          className="h-full bg-linear-to-r from-[#00ADB5] via-purple-500 to-pink-500 transition-all"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Download Button */}
        <button
          onClick={() => window.print()}
          className="no-print fixed top-6 right-6 flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#00ADB5] text-white shadow-lg z-50"
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 w-full">

          {rawSections.map((section, index) => renderSection(section, index))}

        </div>
      </main>

      {/* Scroll to Top */}
      {scrollProgress > 10 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="no-print fixed bottom-8 right-8 w-12 h-12 bg-[#00ADB5] text-white rounded-2xl shadow-xl flex items-center justify-center z-50"
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </button>
      )}
    </div>
  );
}
