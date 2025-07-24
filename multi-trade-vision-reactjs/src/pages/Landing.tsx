import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { FaChartLine, FaUserTie, FaCogs, FaUsers, FaExchangeAlt, FaBullhorn } from 'react-icons/fa';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fil', label: 'Filipino' },
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
];

const Landing: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState<any>(null);

  // Dummy auth check (replace with real auth logic)
  const isAuthenticated = false;

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    fetch('/landing-hero.json')
      .then(res => res.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-profit bg-clip-text text-transparent">
          MultiTradeHub
        </div>
        <div className="flex gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`px-3 py-1 rounded text-xs font-medium ${i18n.language === lang.code ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              onClick={() => i18n.changeLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="flex flex-col md:flex-row items-center gap-12 w-full max-w-6xl mx-auto">
          <div className="flex-1 flex flex-col items-start gap-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2 animate-fade-in">
              {t('hero.headline')}
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground mb-4 animate-fade-in delay-100">
              {t('hero.subheadline')}
            </p>
            <button
              className="btn btn-primary px-8 py-3 text-lg rounded shadow-lg animate-bounce"
              onClick={handleGetStarted}
            >
              {t('hero.getStarted')}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {animationData && <Lottie animationData={animationData} loop className="w-80 h-80" />}
          </div>
        </section>
        <section className="mt-24 w-full max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4">{t('about.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Crypto</h3>
              <p>{t('about.crypto')}</p>
            </div>
            <div className="bg-card p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Stocks</h3>
              <p>{t('about.stocks')}</p>
            </div>
            <div className="bg-card p-6 rounded shadow">
              <h3 className="font-semibold mb-2">{t('about.title')}</h3>
              <p>{t('about.features')}</p>
            </div>
          </div>
        </section>
        <section className="mt-24 w-full max-w-6xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-2 text-primary">Services <span className="text-white">We Offer</span></h2>
          <p className="mb-8 text-muted-foreground">We offer the best services around - from installations to repairs, maintenance, and more!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow flex flex-col items-center">
              <FaUserTie className="text-4xl mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Strategy Consulting</h3>
              <p>A social assistant that's flexible can accommodate your schedule and needs, making life easier.</p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow flex flex-col items-center">
              <FaChartLine className="text-4xl mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Financial Advisory</h3>
              <p>Modules transform smart trading by automating processes and improving decision-making.</p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow flex flex-col items-center">
              <FaCogs className="text-4xl mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Management</h3>
              <p>Your friendly neighborhood reporter's news analyst processes and improving.</p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow flex flex-col items-center">
              <FaExchangeAlt className="text-4xl mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Supply Optimization</h3>
              <p>Check out that new cryptocurrency platform! It's pretty cool and easy to use!</p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow flex flex-col items-center">
              <FaUsers className="text-4xl mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">HR Consulting</h3>
              <p>Quick update on exchange orders. There have been some changes currency!</p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow flex flex-col items-center">
              <FaBullhorn className="text-4xl mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Marketing Consulting</h3>
              <p>Let you know that the price notification module processes is now live!</p>
            </div>
          </div>
        </section>
        <section className="mt-24 w-full max-w-4xl mx-auto animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4">{t('howItWorks.title')}</h2>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>{t('howItWorks.step1')}</li>
            <li>{t('howItWorks.step2')}</li>
            <li>{t('howItWorks.step3')}</li>
          </ol>
        </section>
        <section className="mt-24 w-full max-w-4xl mx-auto animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4">{t('faq.title')}</h2>
          <div className="space-y-4 text-left">
            <div>
              <strong>{t('faq.q1')}</strong>
              <div>{t('faq.a1')}</div>
            </div>
            <div>
              <strong>{t('faq.q2')}</strong>
              <div>{t('faq.a2')}</div>
            </div>
          </div>
        </section>
      </main>
      {/* <footer className="w-full bg-card border-t border-border py-3 text-center text-xs text-muted-foreground mt-12">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </footer> */}
    </div>
  );
};

export default Landing; 