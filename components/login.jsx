// LoginForm with only color changes
'use client';

import { useState} from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

const LoginForm = ({ onSwitchToRegister, onSuccess, onClose }) => {
  const router = useRouter();
  const { login } = useUser();
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed');

      login(data.user);
      onSuccess?.();
      onClose?.();
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-slate-50 border-slate-200 rounded-xl border p-6">
        <legend className="fieldset-legend text-slate-800 font-semibold">Login</legend>

        {error && (
          <div className="alert bg-red-50 border-red-200 text-red-700 mb-4">
            <span>{error}</span>
          </div>
        )}

        <label className="label text-slate-700">Email</label>
        <input
          type="email"
          name="email"
          className="input input-bordered w-full text-black bg-white border-slate-300 focus:border-blue-500"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="label text-slate-700">Password</label>
        <input
          type="password"
          name="password"
          className="input input-bordered w-full text-black bg-white border-slate-300 focus:border-blue-500"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 mt-4 w-full rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            'Login'
          )}
        </button>

        <p className="mt-4 text-center text-sm text-slate-600">
          Are you a new user?{' '}
          <strong
            className="ml-1 cursor-pointer text-blue-600 hover:text-blue-700"
            onClick={onSwitchToRegister}
          >
            Sign up
          </strong>{' '}
          here
        </p>
      </fieldset>
    </form>
  );
};

export default LoginForm;