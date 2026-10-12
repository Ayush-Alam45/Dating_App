/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velora: {
          bg: '#080809',
          surface: '#101013',
          card: '#141418',
          cardHover: '#1a1a20',
          border: 'rgba(255, 255, 255, 0.10)',
          borderHover: 'rgba(196, 21, 39, 0.45)',
          red: '#C41527',
          blood: '#8B0000',
          bloodDark: '#4A0007',
          deepRed: '#660000',
          glowRed: 'rgba(196, 21, 39, 0.35)',
          text: '#FFFFFF',
          textSecondary: '#A1A1AA',
          textMuted: '#71717A'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #C41527 0%, #660000 100%)',
        'blood-gradient': 'linear-gradient(135deg, #D3122A 0%, #4A0007 100%)',
        'subtle-red-radial': 'radial-gradient(circle at 50% 30%, rgba(196, 21, 39, 0.2) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(180deg, rgba(20, 20, 24, 0.6) 0%, rgba(10, 10, 12, 0.95) 100%)',
      },
      boxShadow: {
        'red-glow': '0 0 25px -5px rgba(196, 21, 39, 0.5)',
        'red-glow-lg': '0 0 45px -10px rgba(196, 21, 39, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
