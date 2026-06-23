export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#090b13',
        panel: '#0f172a',
        glow: '#3b82f6',
        accent: '#22d3ee',
        warning: '#facc15',
        danger: '#fb7185',
        success: '#4ade80',
      },
      boxShadow: {
        soft: '0 20px 50px rgba(15, 23, 42, 0.35)',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
