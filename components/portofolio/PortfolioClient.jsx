'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, X, Sparkles, Download } from 'lucide-react';

import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectSection';
import SkillsSection from './SkillsSection';
import CertificationsSection from './CertificationSection';
import ProfileHeader from './ProfileHeader';

export default function PortfolioClient({ profileId }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef({});

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

      // Smooth transition effect delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      setProfile(data?.profile || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading profile');
    } finally {
      setIsLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setSectionRef = (element, id) => {
    sectionRefs.current[id] = element;
  };
  
  // Loading animation
  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center transition-opacity duration-700">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white animate-spin" />
        </div>
      </div>
    );

  // Error / empty state
  if (!isLoading && (error || !profile))
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 transition-opacity duration-700 opacity-100">
        <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-4">
          <X className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Portfolio Unavailable</h1>
        <p className="text-gray-600">{error || 'Profile not found.'}</p>
      </div>
    );

  // Main portfolio content
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 transition-opacity duration-700 opacity-100">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-40">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Print Button */}
      <button
   onClick={() => {
    window.location.href = `/api/resume/pdf?profileId=${profileId}`;
  }}
  className="no-print fixed top-6 right-6 flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:scale-105 transition-all duration-300 z-50"
>
  <Download className="w-5 h-5" />
  <span>Download</span>
</button>

      {/* Profile Content */}
      <main className="relative z-10 transition-opacity duration-700 opacity-100">
        <section id="profile" ref={(el) => setSectionRef(el, 'profile')}>
          <ProfileHeader profile={profile} />
        </section>

        <div className="container mx-auto px-6 max-w-7xl space-y-16">
          {profile.experience?.length > 0 && (
            <section id="experience" ref={(el) => setSectionRef(el, 'experience')}>
              <ExperienceSection experiences={profile.experience} />
            </section>
          )}
          {profile.education?.length > 0 && (
            <section id="education" ref={(el) => setSectionRef(el, 'education')}>
              <EducationSection education={profile.education} />
            </section>
          )}
          {profile.projects?.length > 0 && (
            <section id="projects" ref={(el) => setSectionRef(el, 'projects')}>
              <ProjectsSection projects={profile.projects} />
            </section>
          )}
          {profile.skills?.length > 0 && (
            <section id="skills" ref={(el) => setSectionRef(el, 'skills')}>
              <SkillsSection skills={profile.skills} />
            </section>
          )}
          {profile.certification?.length > 0 && (
            <section id="certifications" ref={(el) => setSectionRef(el, 'certifications')}>
              <CertificationsSection certifications={profile.certification} />
            </section>
          )}
        </div>
      </main>

      {scrollProgress > 10 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="no-print fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 transform rotate-180" />
        </button>
      )}
    </div>
  );
}
