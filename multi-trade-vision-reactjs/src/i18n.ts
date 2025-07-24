import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      hero: {
        headline: 'Invest in Crypto & Stocks with Confidence',
        subheadline: 'Grow your wealth with the world’s most trusted platform.',
        getStarted: 'Get Started',
      },
      about: {
        title: 'Why Invest with Us?',
        crypto: 'Crypto investing offers high growth potential and diversification.',
        stocks: 'Stock investing builds long-term wealth and stability.',
        features: 'Secure, easy, and global access to top assets.',
      },
      howItWorks: {
        title: 'How It Works',
        step1: 'Sign up and verify your account',
        step2: 'Deposit funds securely',
        step3: 'Start investing in crypto and stocks',
      },
      faq: {
        title: 'Frequently Asked Questions',
        q1: 'Is my money safe?',
        a1: 'We use bank-level security and encryption.',
        q2: 'How do I withdraw?',
        a2: 'Withdraw anytime to your bank or wallet.',
      },
      footer: {
        copyright: '© {{year}} MultiTradeHub. All rights reserved.'
      }
    }
  },
  fil: {
    translation: {
      hero: {
        headline: 'Mamuhunan sa Crypto at Stocks nang May Kumpiyansa',
        subheadline: 'Palaguin ang iyong yaman sa pinaka-pinagkakatiwalaang platform.',
        getStarted: 'Magsimula',
      },
      about: {
        title: 'Bakit Mamuhunan sa Amin?',
        crypto: 'Ang crypto investing ay may mataas na potensyal na paglago at diversification.',
        stocks: 'Ang stock investing ay nagtatayo ng pangmatagalang yaman at katatagan.',
        features: 'Ligtas, madali, at global na access sa top assets.',
      },
      howItWorks: {
        title: 'Paano Ito Gumagana',
        step1: 'Mag-sign up at i-verify ang iyong account',
        step2: 'Magdeposito ng pondo nang ligtas',
        step3: 'Simulan ang pag-invest sa crypto at stocks',
      },
      faq: {
        title: 'Mga Madalas Itanong',
        q1: 'Ligtas ba ang pera ko?',
        a1: 'Gumagamit kami ng bank-level security at encryption.',
        q2: 'Paano mag-withdraw?',
        a2: 'Mag-withdraw anumang oras sa iyong banko o wallet.',
      },
      footer: {
        copyright: '© {{year}} MultiTradeHub. Lahat ng karapatan ay nakalaan.'
      }
    }
  },
  pt: {
    translation: {
      hero: {
        headline: 'Invista em Cripto e Ações com Confiança',
        subheadline: 'Cresça seu patrimônio com a plataforma mais confiável do mundo.',
        getStarted: 'Começar',
      },
      about: {
        title: 'Por que Investir Conosco?',
        crypto: 'Investir em cripto oferece alto potencial de crescimento e diversificação.',
        stocks: 'Investir em ações constrói riqueza e estabilidade a longo prazo.',
        features: 'Acesso seguro, fácil e global aos principais ativos.',
      },
      howItWorks: {
        title: 'Como Funciona',
        step1: 'Cadastre-se e verifique sua conta',
        step2: 'Deposite fundos com segurança',
        step3: 'Comece a investir em cripto e ações',
      },
      faq: {
        title: 'Perguntas Frequentes',
        q1: 'Meu dinheiro está seguro?',
        a1: 'Usamos segurança e criptografia de nível bancário.',
        q2: 'Como faço para sacar?',
        a2: 'Saque a qualquer momento para seu banco ou carteira.',
      },
      footer: {
        copyright: '© {{year}} MultiTradeHub. Todos os direitos reservados.'
      }
    }
  },
  es: {
    translation: {
      hero: {
        headline: 'Invierte en Cripto y Acciones con Confianza',
        subheadline: 'Haz crecer tu patrimonio con la plataforma más confiable del mundo.',
        getStarted: 'Comenzar',
      },
      about: {
        title: '¿Por qué Invertir con Nosotros?',
        crypto: 'Invertir en cripto ofrece alto potencial de crecimiento y diversificación.',
        stocks: 'Invertir en acciones construye riqueza y estabilidad a largo plazo.',
        features: 'Acceso seguro, fácil y global a los principales activos.',
      },
      howItWorks: {
        title: 'Cómo Funciona',
        step1: 'Regístrate y verifica tu cuenta',
        step2: 'Deposita fondos de forma segura',
        step3: 'Comienza a invertir en cripto y acciones',
      },
      faq: {
        title: 'Preguntas Frecuentes',
        q1: '¿Mi dinero está seguro?',
        a1: 'Usamos seguridad y cifrado de nivel bancario.',
        q2: '¿Cómo retiro?',
        a2: 'Retira en cualquier momento a tu banco o billetera.',
      },
      footer: {
        copyright: '© {{year}} MultiTradeHub. Todos los derechos reservados.'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 