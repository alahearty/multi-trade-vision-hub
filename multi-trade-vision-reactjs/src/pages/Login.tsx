import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaChartLine, FaUserTie, FaCogs, FaUsers, FaExchangeAlt, FaBullhorn } from 'react-icons/fa';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/members/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.errors?.[0]?.message || 'Invalid credentials.');
        setLoading(false);
        return;
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        memberId: data.memberId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      }));
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="w-full max-w-md bg-card p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to MultiTradeHub</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered px-3 py-2 rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered px-3 py-2 rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary underline">Sign Up</Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-primary">Why Invest With Us?</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3"><FaUserTie className="text-lg text-primary" /><span>Strategy Consulting</span></div>
            <div className="flex items-center gap-3"><FaChartLine className="text-lg text-primary" /><span>Financial Advisory</span></div>
            <div className="flex items-center gap-3"><FaCogs className="text-lg text-primary" /><span>Management</span></div>
            <div className="flex items-center gap-3"><FaExchangeAlt className="text-lg text-primary" /><span>Supply Optimization</span></div>
            <div className="flex items-center gap-3"><FaUsers className="text-lg text-primary" /><span>HR Consulting</span></div>
            <div className="flex items-center gap-3"><FaBullhorn className="text-lg text-primary" /><span>Marketing Consulting</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 