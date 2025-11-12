'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/login';
import RegisterModal from '@/components/register';
import Button from '@/components/button';
import { useUser } from '@/contexts/UserContext';

const Home = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const [activeModal, setActiveModal] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openLogin = () => setActiveModal('login');
  const openRegister = () => setActiveModal('register');
  const closeModal = () => setActiveModal(null);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    router.push('/');
  };

  const goToDashboard = () => router.push('/dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md space-y-8">
        {/* Enhanced Heading */}
        <div className="space-y-6">
          <div className="relative inline-block">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ProfileManager
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-slate-600 font-light">
            Manage your professional profile with ease
          </p>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col gap-5">
          {!user ? (
            <>
              <Button 
                title="Sign In" 
                onClick={openLogin} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5" 
              />
              <Button 
                title="Create Account" 
                onClick={openRegister} 
                className="bg-white hover:bg-slate-50 text-blue-600 border-2 border-blue-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5" 
              />
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg mx-auto overflow-hidden">
                    <img 
                      src={user?.avatar} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Welcome back, {user.name}!</h2>
                <p className="text-slate-500 mt-1">Ready to manage your profile?</p>
              </div>
              <Button 
                title="Go to Dashboard" 
                onClick={goToDashboard} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5" 
              />
              <Button 
                title="Logout" 
                onClick={handleLogout} 
                className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-slate-300 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
              />
            </>
          )}
        </div>
      </div>

      {/* Enhanced Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 relative animate-in fade-in-90 zoom-in-95">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
            >
              <span className="text-slate-500 hover:text-slate-700">✕</span>
            </button>

            {activeModal === 'login' && (
              <LoginForm 
                onSwitchToRegister={() => setActiveModal('register')} 
                onSuccess={closeModal}
              />
            )}
            {activeModal === 'register' && (
              <RegisterModal 
                onSwitchToLogin={() => setActiveModal('login')} 
                onSuccess={closeModal}
              />
            )}
          </div>
        </div>
      )}

      {/* Enhanced Logout Confirmation Modal */}
      {showLogoutModal && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-white shadow-2xl border border-slate-200 rounded-2xl max-w-sm mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-orange-100">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-800">Confirm Logout</h3>
            </div>
            <p className="py-4 text-slate-600">Are you sure you want to logout?</p>
            <div className="modal-action">
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowLogoutModal(false)} 
                  className="btn btn-ghost flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-0 font-medium rounded-xl py-3"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmLogout} 
                  className="btn flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 font-medium rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={() => setShowLogoutModal(false)} />
        </dialog>
      )}
    </div>
  );
};

export default Home;