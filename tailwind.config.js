/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#F8F9FA',
          text: '#212529',
          accent: '#007BFF',
        },
        status: {
          paid: '#28A745',
          sent: '#17A2B8',
          expired: '#6C757D',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
};