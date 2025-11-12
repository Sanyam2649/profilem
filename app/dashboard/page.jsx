'use client';

import {useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { 
  FileText, 
  TrendingUp, 
  Plus,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import ProfileList from '@/components/dashboard/ProfileList';
import SearchBar from '@/components/dashboard/Searchbar';
import ProfileFormModal from '@/components/dashboard/ProfileFormModal'; 

const Dashboard = () => {
  const router = useRouter();
  const { user } = useUser();
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [stats, setStats] = useState({
    totalProfiles: 0,
    recentProfiles: 0,
  });

  // Check authentication with proper loading state
  useEffect(() => {
    if (user === null) {
      setIsCheckingAuth(true);
    } else if (user === undefined || !user._id) {
      router.push('/');
    } else {
      setIsCheckingAuth(false);
    }
  }, [user, router]);

  // Fetch user profiles
  const fetchProfiles = useCallback(async () => {
    if (!user || !user._id) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch profiles: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Profiles API response:', data);
      
      // Handle different response structures and ensure all required arrays are present
      let userProfiles= [];
      
      if (data.profile) {
        userProfiles = Array.isArray(data.profile) ? data.profile : [data.profile];
      } else if (data.profiles) {
        userProfiles = data.profiles;
      } else if (Array.isArray(data)) {
        userProfiles = data;
      }
      
      const completeProfiles = userProfiles.map((profile) => ({
        _id: profile._id || `temp-${Date.now()}-${Math.random()}`,
        name: profile.name || '',
        email: profile.email || '',
        location: profile.location || '',
        phone: profile.phone || '',
        website: profile.website || '',
        bio: profile.bio || '',
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        twitter: profile.twitter || '',
        portfolio: profile.portfolio || '',
        education: profile.education || [],
        experience: profile.experience || [],
        projects: profile.projects || [],
        skills: profile.skills || [],
        interests: profile.interests || [],
        certifications: profile.certifications || [],
        updatedAt: profile.updatedAt || new Date().toISOString(),
        createdAt: profile.createdAt || new Date().toISOString()
      }));
      
      console.log('Processed profiles:', completeProfiles);
      
      setProfiles(completeProfiles);
      setFilteredProfiles(completeProfiles);
      
      // Calculate stats
      const totalProfiles = completeProfiles.length;
      const recentProfiles = completeProfiles.filter((p) => 
        new Date(p.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length;
      
      const thisMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const profilesThisMonth = completeProfiles.filter((p) => {
        const profileDate = new Date(p.updatedAt);
        return profileDate.getMonth() === thisMonth && profileDate.getFullYear() === currentYear;
      }).length;

      setStats({
        totalProfiles,
        recentProfiles,
      });
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setProfiles([]);
      setFilteredProfiles([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isCheckingAuth && user) {
      fetchProfiles();
    }
  }, [fetchProfiles, isCheckingAuth, user]);

  const handleSearch = useCallback((query) => {
    if (!query.trim()) {
      setFilteredProfiles(profiles);
      return;
    }

    const filtered = profiles.filter(profile =>
      profile.name?.toLowerCase().includes(query.toLowerCase()) ||
      profile.email?.toLowerCase().includes(query.toLowerCase()) ||
      profile.location?.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredProfiles(filtered);
  }, [profiles]);

  // Modal handlers
  const handleCreateProfile = () => {
    console.log('Opening create profile modal');
    setEditingProfile(null);
    setIsFormModalOpen(true);
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    setIsFormModalOpen(true);
  };

  const handleSaveProfile = async (profileData) => {
    if (!user) return;

    setIsSaving(true);
    try {
      let response;
      
      if (editingProfile) {
        response = await fetch('/api/profile/update', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profileId: editingProfile._id,
            userId: user._id,
            updates: profileData
          }),
        });
      } else {
        response = await fetch('/api/profile/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user._id,
            ...profileData
          }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to save profile: ${response.status}`);
      }

      await fetchProfiles();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setIsFormModalOpen(false);
    setEditingProfile(null);
  };

  const handleDeleteProfile = async (profileId) => {
    if (!confirm('Are you sure you want to delete this profile? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/profile/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete profile: ${response.status}`);
      }

      await fetchProfiles();
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile. Please try again.');
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Welcome back, <span className="text-blue-600">{user?.name}</span>!
                  </h1>
                  <p className="text-lg text-slate-600 mt-2 max-w-2xl">
                    Manage your professional profiles and showcase your skills.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCreateProfile}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 lg:w-auto w-full justify-center"
            >
              <Plus className="w-5 h-5" />
              Create New Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatsCard
            title="Total Profiles"
            value={stats.totalProfiles}
            icon={<FileText className="w-6 h-6" />}
            description="All professional profiles"
            className="bg-white/80 backdrop-blur-sm border border-slate-200/60"
          />
          <StatsCard
            title="Recent Activity"
            value={stats.recentProfiles}
            icon={<TrendingUp className="w-6 h-6" />}
            description="Updated this week"
            className="bg-white/80 backdrop-blur-sm border border-slate-200/60"
          />
        </div>
        
        {/* Search and Profiles Section */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">Your Profiles</h2>
                <p className="text-slate-600 mt-1">
                  Manage your professional profiles
                </p>
              </div>
            </div>
            <div className="w-full sm:w-80">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search by name, email, or location..."
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
                <p className="text-slate-600">Loading your profiles...</p>
              </div>
            </div>
          ) : (
            <ProfileList
              profiles={filteredProfiles}
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile}
              isLoading={false}
            />
          )}
        </div>

        {/* Empty State */}
        {!isLoading && profiles.length === 0 && (
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl mt-12 p-8 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center gap-6 text-center lg:text-left">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-amber-800 mb-3">Start Your Professional Journey</h3>
                <p className="text-amber-700/80 text-lg">
                  Create your first professional profile to showcase your skills and experience.
                </p>
              </div>
              <button
                onClick={handleCreateProfile}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 lg:w-auto w-full justify-center"
              >
                <Plus className="w-5 h-5" />
                Create Your First Profile
              </button>
            </div>
          </div>
        )}
      </div>

      <ProfileFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        editingProfile={editingProfile}
        isSaving={isSaving}
      />
    </div>
  );
};

export default Dashboard;