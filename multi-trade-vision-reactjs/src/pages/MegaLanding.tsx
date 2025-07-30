import React from 'react';
import { Link } from 'react-router-dom';

const avatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/46.jpg',
  'https://randomuser.me/api/portraits/men/47.jpg',
  'https://randomuser.me/api/portraits/women/48.jpg',
];

export default function MegaLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="text-lime-400 text-2xl font-bold tracking-widest">CRYPTO.</div>
        <ul className="hidden md:flex gap-8 text-gray-300 text-lg">
          <li><a href="#" className="hover:text-lime-400">Home</a></li>
          <li><a href="#" className="hover:text-lime-400">Services</a></li>
          <li><a href="#" className="hover:text-lime-400">About</a></li>
          <li><a href="#" className="hover:text-lime-400">What's new?</a></li>
        </ul>
        <button className="bg-lime-400 text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-lime-300 transition">Explore now</button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16 gap-12">
        <div className="flex-1 max-w-xl">
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-2">Keep your money safe <span className="text-lime-400">!</span></p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Best <span className="text-gray-400">crypto</span><br />
            <span className="text-lime-400">investing platform</span><br />
            for your <span className="text-gray-400">future.</span>
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="avatar" className="w-8 h-8 rounded-full border-2 border-gray-900" />
              ))}
            </div>
            <div className="text-sm text-gray-300 font-medium">
              <span className="text-white font-bold">168K+</span> Realtime Users
            </div>
          </div>
          <p className="text-gray-400 mb-6">
            Polkadot unites and secures a growing ecosystem of specialized blockchains called parachains. Apps and services on Polkadot can.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="bg-lime-400 text-black px-6 py-3 rounded-full font-semibold shadow hover:bg-lime-300 transition text-center">Login</Link>
            <Link to="/signup" className="bg-transparent border border-lime-400 text-lime-400 px-6 py-3 rounded-full font-semibold hover:bg-lime-400 hover:text-black transition text-center">Sign Up</Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-8">
          {/* SVG App Screenshot and Chart */}
          <div className="relative w-64 h-48 bg-gray-800 rounded-3xl shadow-2xl flex items-center justify-center">
            {/* App Screenshot SVG */}
            <span className="absolute inset-0 flex items-center justify-center">
              <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="160" height="100" rx="20" fill="#23293a" />
                <rect x="40" y="30" width="100" height="60" rx="12" fill="#181e2a" />
                <circle cx="90" cy="60" r="18" fill="#C6FF00" fillOpacity="0.15" />
                <path d="M60 70 Q90 40 120 70" stroke="#C6FF00" strokeWidth="3" fill="none" />
                <circle cx="60" cy="70" r="3" fill="#C6FF00" />
                <circle cx="120" cy="70" r="3" fill="#C6FF00" />
                <circle cx="90" cy="40" r="3" fill="#C6FF00" />
              </svg>
            </span>
            <div className="absolute -right-8 -bottom-8 w-40 h-32 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl border-2 border-lime-400">
              {/* Chart SVG */}
              <span>
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="80" rx="16" fill="#181e2a" />
                  <polyline
                    points="10,70 30,50 50,60 70,30 90,40 110,20"
                    fill="none"
                    stroke="#C6FF00"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="70" r="3" fill="#C6FF00" />
                  <circle cx="30" cy="50" r="3" fill="#C6FF00" />
                  <circle cx="50" cy="60" r="3" fill="#C6FF00" />
                  <circle cx="70" cy="30" r="3" fill="#C6FF00" />
                  <circle cx="90" cy="40" r="3" fill="#C6FF00" />
                  <circle cx="110" cy="20" r="3" fill="#C6FF00" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 md:px-24 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800">
          <div className="text-lime-400 text-lg font-bold mb-2">01.</div>
          <div className="text-xl font-semibold mb-2">Service for Any Level of Expertise.</div>
          <div className="text-gray-400 text-sm">Polkadot unites and secures a growing ecosystem of specialized blockchains.</div>
        </div>
        <div className="bg-lime-400 text-black rounded-2xl p-8 shadow-lg border border-lime-300 flex flex-col justify-between">
          <div>
            <div className="text-lg font-bold mb-2">02.</div>
            <div className="text-xl font-semibold mb-2">Industry best practices.</div>
            <div className="text-sm mb-4">Polkadot unites and secures a growing ecosystem of specialized blockchains called specialized unites.</div>
          </div>
          <a href="#" className="font-bold flex items-center gap-2 hover:underline">Learn More <span>&rarr;</span></a>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800">
          <div className="text-lime-400 text-lg font-bold mb-2">03.</div>
          <div className="text-xl font-semibold mb-2">Protected by Insurance.</div>
          <div className="text-gray-400 text-sm">Polkadot unites and secures a growing ecosystem of specialized blockchains.</div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-8 md:px-24 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Your <span className="text-lime-400">trusted</span> partner of <span className="text-gray-400">cryptocurrency.</span>
        </h2>
        <div className="text-gray-400 max-w-2xl mb-8">
          Polkadot unites and secures a growing ecosystem of specialized blockchains called parachains. Apps and services on Polkadot can ecosystem of specialized called.
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 md:px-24 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
          <div className="text-lime-400 font-bold text-lg mb-2">$4,528 USD</div>
          <div className="text-gray-400 text-sm mb-2">Polkadot unites and secures a growing ecosystem of specialized blockchains.</div>
          <div className="text-xs text-gray-500">02 May</div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col justify-between">
          <div>
            <div className="text-lime-400 font-bold text-lg mb-2">1,44,528 BTC</div>
            <div className="text-gray-400 text-sm mb-2">Polkadot unites and secures a growing ecosystem of specialized blockchains.</div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col justify-between">
          <div className="text-gray-400 text-sm mb-2">Average Rate</div>
          <div className="text-lime-400 font-bold text-lg mb-2">$4,528 USD</div>
          <div className="text-xs text-gray-500">02 May</div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-8 md:px-24 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Trusted <span className="text-lime-400">platform</span> anytime <span className="text-gray-400">& anywhere.</span>
          </h3>
          <div className="text-gray-400 max-w-lg mb-4">
            This is a unites and secures a <span className="font-bold text-white">growing ecosystem</span> of specialized blockchains called parachains. Apps and services on Polkadot can ecosystem of specialized called.
          </div>
          <button className="bg-lime-400 text-black px-8 py-3 rounded-full font-semibold shadow hover:bg-lime-300 transition">Learn More</button>
        </div>
        <div className="text-gray-400 text-sm">Ask question ?</div>
      </section>
    </div>
  );
} 