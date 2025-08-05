import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaChartLine, FaUserTie, FaCogs, FaUsers, FaExchangeAlt, FaBullhorn } from 'react-icons/fa';
import { apiClient } from '@/lib/api';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDay: '',
    gender: '',
    mobileNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    whatsapp: false,
    viber: false,
    telegram: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || 
        !formData.birthDay || !formData.gender || !formData.mobileNumber || !formData.street || 
        !formData.city || !formData.state || !formData.zipCode) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    
    try {
      const signUpRequest = {
        userDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName
        },
        email: formData.email,
        birthDay: formData.birthDay,
        gender: formData.gender,
        password: formData.password,
        contact: {
          mobileNumber: formData.mobileNumber,
          whatsapp: formData.whatsapp,
          viber: formData.viber,
          telegram: formData.telegram
        },
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        }
      };

      const response = await apiClient.signUp(signUpRequest);
      
      if (response.error) {
        setError(response.error);
        return;
      }
      
      if (response.data) {
        // Redirect to login after successful signup
        navigate('/login');
      }
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
          <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered px-3 py-2 rounded"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered px-3 py-2 rounded"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered px-3 py-2 rounded"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                name="birthDay"
                placeholder="Birthday"
                className="input input-bordered px-3 py-2 rounded"
                value={formData.birthDay}
                onChange={handleInputChange}
                required
              />
              <select
                name="gender"
                className="input input-bordered px-3 py-2 rounded"
                value={formData.gender}
                onChange={handleInputChange}
                required
                aria-label="Select Gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              className="input input-bordered px-3 py-2 rounded"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              className="input input-bordered px-3 py-2 rounded"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="input input-bordered px-3 py-2 rounded"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="input input-bordered px-3 py-2 rounded"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                className="input input-bordered px-3 py-2 rounded"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Communication Preferences:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="whatsapp"
                    checked={formData.whatsapp}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm">WhatsApp</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="viber"
                    checked={formData.viber}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm">Viber</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="telegram"
                    checked={formData.telegram}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm">Telegram</span>
                </label>
              </div>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered px-3 py-2 rounded"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input input-bordered px-3 py-2 rounded"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
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