import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaChartLine, FaUserTie, FaCogs, FaUsers, FaExchangeAlt, FaBullhorn } from 'react-icons/fa';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Mock sign up logic
    navigate('/login'); // Redirect to login after sign up
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="w-full max-w-md bg-card p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered px-3 py-2 rounded"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered px-3 py-2 rounded"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="btn btn-primary w-full">Sign Up</button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary underline">Login</Link>
          </div>
        </div>
        <div className="w-full max-w-md bg-card p-8 rounded shadow-lg mt-8 md:mt-0">
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

export default SignUp; 