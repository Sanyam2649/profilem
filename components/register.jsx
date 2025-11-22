'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Image from 'next/image';

const RegisterModal = ({ onSwitchToLogin, onSuccess }) => {
  const router = useRouter();
  const { login } = useUser();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarFile: null,
    avatarPreview: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("password", formData.password);

      if (formData.avatarFile) {
        fd.append("avatar", formData.avatarFile);
      }

      const res = await fetch("/api/user/register", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      login(data.user);
      onSuccess?.();
      router.push("/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <fieldset className="fieldset bg-slate-50 border-slate-200 rounded-xl border p-6 relative">

        {/* Avatar Upload */}
        <div className="relative flex justify-center mb-6">
          <div className="relative">
            <label className="cursor-pointer group">

              {/* Avatar Circle */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md overflow-hidden mx-auto -mt-16 bg-slate-200 group-hover:opacity-80 transition">

                {formData.avatarPreview ? (
                  <Image
                    src={formData.avatarPreview}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-500">
                    Upload
                  </div>
                )}

              </div>

              {/* Hidden Input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData(prev => ({
                    ...prev,
                    avatarFile: file,
                    avatarPreview: file ? URL.createObjectURL(file) : null,
                  }));
                }}
              />

            </label>
          </div>
        </div>

        <legend className="fieldset-legend text-slate-800 font-semibold">Register</legend>

        {error && (
          <div className="alert bg-red-50 border-red-200 text-red-700 mb-4">
            <span>{error}</span>
          </div>
        )}

        <label className="label text-slate-700">Full Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered bg-white border-slate-300 text-black w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="label text-slate-700">Email</label>
        <input
          type="email"
          name="email"
          className="input input-bordered bg-white border-slate-300 text-black w-full"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="label text-slate-700">Password</label>
        <input
          type="password"
          name="password"
          className="input input-bordered bg-white border-slate-300 text-black w-full"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="label text-slate-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="input input-bordered bg-white border-slate-300 text-black w-full"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn bg-linear-to-r from-blue-600 to-purple-600 text-white border-0 mt-4 w-full rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-spinner loading-sm" /> : "Register"}
        </button>

        <p className="text-center mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <strong className="text-blue-600 cursor-pointer" onClick={onSwitchToLogin}>
            Sign In
          </strong>
        </p>
      </fieldset>
      

    </form>
  );
};

export default RegisterModal;
