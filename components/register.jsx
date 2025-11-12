// RegisterModal with only color changes
'use client';
import { useState} from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

const RegisterModal = ({ onSwitchToLogin, onSuccess }) => {
  const router = useRouter();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          avatar: formData.avatar || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');

      login(data.user);
      onSuccess?.();
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-slate-50 border-slate-200 rounded-xl border p-6">
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
          placeholder="Full Name"
          className="input input-bordered w-full bg-white border-slate-300 focus:border-blue-500"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="label text-slate-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full bg-white border-slate-300 focus:border-blue-500"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="label text-slate-700">Avatar URL (optional)</label>
        <input
          type="url"
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          className="input input-bordered w-full bg-white border-slate-300 focus:border-blue-500"
          value={formData.avatar}
          onChange={handleChange}
        />

        <label className="label text-slate-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full bg-white border-slate-300 focus:border-blue-500"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="label text-slate-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input input-bordered w-full bg-white border-slate-300 focus:border-blue-500"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 mt-4 w-full rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            'Register'
          )}
        </button>

        <p className="text-center mt-4 text-sm text-slate-600">
          Already have an account?{' '}
          <strong
            className="ml-1 cursor-pointer text-blue-600 hover:text-blue-700"
            onClick={onSwitchToLogin}
          >
            Sign In
          </strong>
        </p>
      </fieldset>
    </form>
  );
};

export default RegisterModal;