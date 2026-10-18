'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) router.push('/admin/dashboard');
      else {
        const d = await res.json();
        setError(d.error || 'Invalid password');
      }
    } catch {
      setError('Connection error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#5472E6] flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-sm font-bold">X</span>
          </div>
          <h1 className="text-lg font-bold text-[#E8ECF4] tracking-tight">Admin Access</h1>
          <p className="text-xs text-[#5A6275] mt-1">Authorized personnel only</p>
        </div>
        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              className="input"
              placeholder="Enter admin password"
            />
          </div>
          {error && (
            <div className="p-3 rounded-lg bg-[rgba(229,84,84,0.1)] border border-[rgba(229,84,84,0.2)] text-[#E55454] text-xs">
              {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm">
            {loading ? 'Verifying...' : 'Unlock'}
          </button>
        </form>
        <div className="text-center mt-6">
          <a href="/" className="text-xs text-[#5A6275] hover:text-[#8A92A5] transition-colors">
            &larr; Back to main site
          </a>
        </div>
      </div>
    </div>
  );
}
