'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronDown, X, Sparkles } from 'lucide-react';

import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectSection';
import SkillsSection from './SkillsSection';
import CertificationsSection from './CertificationSection';
import ProfileHeader from './ProfileHeader';
import CustomSection from './CustomSection';
import LazySection from './LazySection';

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

      await new Promise((resolve) => setTimeout(resolve, 150));

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
    if (key === "customFields") return "customSections";
    if (key === "certifications") return "certification";
    return key;
  };

  /* -----------------------------
     SECTION ORDER
  ------------------------------*/
  const getOrderedSections = () => {
    const order = profile.sectionOrder ?? [];
    const normalized = order.map(normalize);

    const allKeys = [
      "personal",
      "education",
      "experience",
      "projects",
      "skills",
      "certification",
      "customSections",
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
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
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
        <p className="text-gray-600">{error || "Profile not found"}</p>
      </div>
    );

  const orderedSections = getOrderedSections();
  const firstSection = orderedSections[0];
  const lazySections = orderedSections.slice(1);

  /* -----------------------------
     HIGHLY OPTIMIZED SECTION MAP
  ------------------------------*/
  const sectionMap = {
    personal: <ProfileHeader profile={profile.personal} />,

    education: (
      <EducationSection education={profile.education} />
    ),

    experience: (
      <ExperienceSection experiences={profile.experience} />
    ),

    projects: (
      <ProjectsSection projects={profile.projects} />
    ),

    skills: <SkillsSection skills={profile.skills} />,

    certification: (
      <CertificationsSection certifications={profile.certification} />
    ),

    customSections: (
      <div className="space-y-12">
        {profile.customSections?.map((sec) => (
          <CustomSection key={sec._id} section={sec} />
        ))}
      </div>
    ),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-40">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* MAIN CONTENT */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 w-full pb-24">

          {/* FIRST SECTION (No Lazy Loading) */}
          {sectionMap[firstSection]}

          {/* OTHER SECTIONS — lazy loaded */}
          {lazySections.map((section) => (
            <LazySection key={section}>
              {sectionMap[section]}
            </LazySection>
          ))} 

        </div>
      </main>

      {/* Scroll to Top */}
      {scrollProgress > 10 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="no-print fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl flex items-center justify-center z-50"
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </button>
      )}
    </div>
  );
}
