'use client';

import {useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Settings, 
  LogOut, 
  X, 
  Mail, 
  User as UserIcon,
  Camera,
  Trash2,
  Save,
  Loader2,
  Shield,
  AlertTriangle,
  Edit3,
  Key,
  Star,
} from 'lucide-react';
import LoginForm from './login';
import RegisterModal from './register';
import { useUser } from '@/contexts/UserContext';

// Utility function to get initials from name
const getNameInitials = (name) => {
  if (!name || name.trim().length === 0) return 'U';
  
  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length === 1) {
    return nameParts[0].slice(0, 2).toUpperCase();
  }
  return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
};

// Utility function to get color based on name
const getAvatarColor = (name) => {
  const colors = [
    'bg-gradient-to-br from-blue-500 to-cyan-500',
    'bg-gradient-to-br from-purple-500 to-pink-500',
    'bg-gradient-to-br from-emerald-500 to-teal-500',
    'bg-gradient-to-br from-orange-500 to-red-500',
    'bg-gradient-to-br from-violet-500 to-purple-500',
    'bg-gradient-to-br from-amber-500 to-orange-500',
    'bg-gradient-to-br from-green-500 to-emerald-500',
    'bg-gradient-to-br from-rose-500 to-pink-500',
    'bg-gradient-to-br from-indigo-500 to-blue-500',
    'bg-gradient-to-br from-sky-500 to-blue-500',
  ];

  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const Navbar = () => {
  const router = useRouter();
  const { user, login, logout } = useUser();  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Profile modal states
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: ''
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  // Settings modal states
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleLogout = useCallback(() => {
    logout();
    setShowLogoutModal(false);
    router.push('/');
  }, [logout, router]);

  const handleLoginSuccess = useCallback((userData) => {
    login(userData);
    setShowLoginModal(false);
  }, [login]);

  const handleRegisterSuccess = useCallback((userData) => {
    login(userData);
    setShowRegisterModal(false);
  }, [login]);

  // Modal navigation functions
  const openRegisterFromLogin = useCallback(() => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  }, []);

  const openLoginFromRegister = useCallback(() => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  }, []);

  // Profile Modal Functions
  const openProfileModal = useCallback(() => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowProfileModal(true);
    setProfileError('');
    setProfileSuccess('');
  }, [user]);

  const handleProfileUpdate = useCallback(async () => {
    if (!user) return;
    
    setIsUpdatingProfile(true);
    setProfileError('');
    setProfileSuccess('');
    
    try {
      const response = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user._id, 
          name: profileData.name,
          email: profileData.email,
          avatar: profileData.avatar 
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }
      
      const data = await response.json();
      const updatedUser = data.user;
      
      login(updatedUser);
      setProfileSuccess('Profile updated successfully!');
      
      setTimeout(() => setProfileSuccess(''), 3000);
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  }, [user, profileData, login]);

  const handleProfileChange = useCallback((field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Settings Modal Functions
  const openSettingsModal = useCallback(() => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowSettingsModal(true);
    setDeleteConfirm('');
    setProfileError('');
  }, [user]);

  const handleDeleteAccount = useCallback(async () => {
    if (!user) return;
    
    if (deleteConfirm !== 'DELETE') {
      setProfileError('Please type "DELETE" to confirm account deletion');
      return;
    }

    setIsDeleting(true);
    setProfileError('');
    
    try {
      const response = await fetch(`/api/user/${user._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete account');
      }
      
      handleLogout();
    } catch (error) {
      setProfileError(error? error.message : 'Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  }, [user, deleteConfirm, handleLogout]);

  const closeModals = useCallback(() => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowProfileModal(false);
    setShowSettingsModal(false);
    setProfileError('');
    setProfileSuccess('');
    setDeleteConfirm('');
  }, []);

  // Avatar Component
  const UserAvatar = ({ user, size = 'md' }) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-16 h-16 text-xl'
    };

    const initials = getNameInitials(user.name);
    const colorClass = getAvatarColor(user.name);

    if (user.avatar) {
      return (
        <div className={`${sizeClasses[size]} rounded-full border-2 border-white/20 shadow-lg overflow-hidden`}>
          <Image
            src={user.avatar}
            alt="Profile Avatar"
            width={size === 'sm' ? 32 : size === 'md' ? 40 : 64}
            height={size === 'sm' ? 32 : size === 'md' ? 40 : 64}
            className="rounded-full object-cover w-full h-full"
            onError={(e) => {
              console.error('Failed to load avatar image');
            }}
          />
        </div>
      );
    }

    return (
      <div className={`${sizeClasses[size]} ${colorClass} rounded-full border-2 border-white/20 flex items-center justify-center text-white font-semibold shadow-lg`}>
        {initials}
      </div>
    );
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 sm:px-6 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Section - Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push('/')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                ProfileManager
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Professional Profile Management</p>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="dropdown dropdown-end">
                {/* Avatar Button */}
                <div 
                  tabIndex={0} 
                  role="button" 
                  className="flex items-center gap-3 p-2 rounded-2xl bg-white/50 hover:bg-white/80 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <UserAvatar user={user} size="md" />
                  <div className="hidden sm:block text-left">
                    <div className="font-semibold text-slate-800 text-sm">{user.name}</div>
                    <div className="text-xs text-slate-500">View Profile</div>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <ul
                  tabIndex={-1}
                  className="dropdown-content menu bg-white/95 backdrop-blur-lg rounded-2xl z-50 mt-3 w-100 p-2 shadow-xl border border-slate-200/60"
                >
                  {/* Profile Header */}
                  <li className="p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl border border-blue-100/50 mb-2">
                    <div className="flex items-center gap-4">
                      <UserAvatar user={user} size="lg" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 truncate">{user.name}</h3>
                        <p className="text-sm text-slate-600 truncate">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-3 h-3 text-amber-500" />
                          <span className="text-xs text-slate-500">
                            Member since {new Date(user.createdAt).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <a 
                      onClick={openProfileModal} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50/80 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Edit3 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Edit Profile</div>
                        <div className="text-xs text-slate-500">Update your personal information</div>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a 
                      onClick={openSettingsModal} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50/80 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Settings className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Account Settings</div>
                        <div className="text-xs text-slate-500">Manage your preferences</div>
                      </div>
                    </a>
                  </li>

                  <li className="border-t border-slate-200/60 mt-2 pt-2">
                    <a 
                      onClick={() => setShowLogoutModal(true)} 
                      className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50/80 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <LogOut className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Logout</div>
                        <div className="text-xs text-red-500/80">Sign out of your account</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

{showProfileModal && user && (
  <div className="modal modal-open">
    <div className="modal-box relative max-w-4xl p-0  text-black overflow-visible bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-slate-200 p-6 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-slate-800">Edit Profile</h3>
              <p className="text-slate-600">Update your personal information</p>
            </div>
          </div>
          <button
            className="btn btn-sm btn-circle btn-ghost hover:bg-slate-200 transition-colors"
            onClick={closeModals}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Avatar & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar Card */}
            <div className="card bg-slate-50/80 border border-slate-200/60 p-4 rounded-2xl">
              <div className="text-center">
                <div className="avatar mb-4 relative">
                  {profileData.avatar ? (
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl mx-auto overflow-hidden">
                      <Image
                        src={profileData.avatar}
                        alt="Profile Avatar"
                        width={128}
                        height={128}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className={`w-32 h-32 ${getAvatarColor(profileData.name || user.name)} rounded-full border-4 border-white/20 mx-auto flex items-center justify-center text-white text-4xl font-bold shadow-xl`}>
                      {getNameInitials(profileData.name || user.name)}
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="form-control w-full">
                  <input
                    type="text"
                    className="input input-bordered input-sm w-full bg-white border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={profileData.avatar}
                    onChange={(e) => handleProfileChange('avatar', e.target.value)}
                    placeholder="Paste image URL"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <div className="card bg-slate-50/80 border border-slate-200/60 p-6 rounded-2xl">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="form-control flex flex-col">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2 text-slate-700">
                      <UserIcon className="w-4 h-4" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered bg-white border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={profileData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="form-control flex flex-col">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2 text-slate-700">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered bg-white border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Error/Success Messages */}
                {profileError && (
                  <div className="alert bg-red-50 border border-red-200 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700">{profileError}</span>
                  </div>
                )}
                {profileSuccess && (
                  <div className="alert bg-green-50 border border-green-200 rounded-xl">
                    <Save className="w-5 h-5 text-green-600" />
                    <span className="text-green-700">{profileSuccess}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    className="btn bg-white border-slate-300 hover:bg-slate-50 text-slate-700 flex-1 rounded-xl"
                    onClick={closeModals}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 flex-1 gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={handleProfileUpdate}
                    disabled={isUpdatingProfile}
                  >
                    {isUpdatingProfile ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop bg-black/40" onClick={closeModals} />
  </div>
)}

      {/* Enhanced Logout Modal */}
      {showLogoutModal && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-white border border-slate-200/60 rounded-2xl max-w-sm mx-auto p-0 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-amber-100">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">Logout Confirmation</h3>
              </div>
              <p className="py-4 text-slate-600">Are you sure you want to log out?</p>
              <div className="modal-action">
                <div className="flex gap-3 w-full">
                  <button
                    type="button"
                    className="btn bg-white border-slate-300 hover:bg-slate-50 text-slate-700 flex-1 rounded-xl"
                    onClick={() => setShowLogoutModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 flex-1 gap-2 rounded-xl shadow-lg hover:shadow-xl"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={() => setShowLogoutModal(false)} />
        </dialog>
      )}

      {/* Enhanced Login Modal */}
      {showLoginModal && (
        <dialog className="modal modal-open">
          <div className="modal-box relative max-w-md bg-white border border-slate-200/60 rounded-2xl p-0 overflow-hidden">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10 hover:bg-slate-200"
              onClick={closeModals}
            >
              <X className="w-4 h-4" />
            </button>            
            <div className="px-6 py-6 text-black">
              <LoginForm
                onSuccess={handleLoginSuccess}
                onClose={closeModals}
                onSwitchToRegister={openRegisterFromLogin}
              />
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={closeModals} />
        </dialog>
      )}

      {/* Enhanced Register Modal */}
      {showRegisterModal && (
        <dialog className="modal modal-open">
          <div className="modal-box relative max-w-md bg-white border border-slate-200/60 rounded-2xl p-0 overflow-hidden">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10 hover:bg-slate-200"
              onClick={closeModals}
            >
              <X className="w-4 h-4" />
            </button>  
            <div className="px-6 py-6 text-black overflow-y-auto">
              <RegisterModal
                onSwitchToLogin={openLoginFromRegister}
                onSuccess={handleRegisterSuccess}
              />
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={closeModals} />
        </dialog>
      )}

      {/* Enhanced Settings Modal */}
      {showSettingsModal && user && (
        <dialog className="modal modal-open">
          <div className="modal-box relative max-w-lg bg-white border border-slate-200/60 rounded-2xl p-0 overflow-hidden text-red-500">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10 hover:bg-slate-200"
              onClick={closeModals}
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="p-6 border-b border-slate-200/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-slate-800">Account Settings</h3>
                  <p className="text-slate-600">Manage your account preferences</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Danger Zone */}
              <div className="border-2 border-red-200 bg-red-50/50 rounded-2xl overflow-hidden">
                <div className="p-6 space-y-4">
                  <div>
                    <h5 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                      <Trash2 className="w-5 h-5" />
                      Delete Account
                    </h5>
                    <p className="text-red-600/80 text-sm mb-3">
                      Once you delete your account, all your data will be permanently removed. 
                      This action cannot be undone.
                    </p>
                  </div>

                  <div className="form-control justify-center items-center">
                    <label className="label">
                      <span className="label-text text-red-700 font-medium">
                        Type <span className="font-mono bg-red-200 px-2 py-1 rounded">DELETE</span> to confirm
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered border-red-300 bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                      placeholder="Type DELETE to confirm"
                    />
                  </div>

                  {profileError && (
                    <div className="alert bg-red-50 border border-red-200 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700">{profileError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 w-full gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting || deleteConfirm !== 'DELETE'}
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Delete Account Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={closeModals} />
        </dialog>
      )}
    </>
  );
};

export default Navbar;
