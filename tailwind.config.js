/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },

      colors: {
        primary: {
          700: '#0833A0',
          500: '#2D62EA',
          300: '#6691FF',
        },
        white: '#FFFFFF',
        black: '#141212',
        erro: '#DF291D',
        text: {
          900: '#1D1D1D',
          700: '#505050',
          400: '#AEAEAE',
        },
        text_hold: '#CFCFCF',
        bg: {
          300: '#CFCFCF',
          100: '#F4F4F4',
          50: '#FBFBFB',
        },
        bgc: {
          100: '#BFD1FF',
          50: '#EBF1FF',
        },
        line: {
          300: '#CFCFCF',
          200: '#E7E7E7',
        },
        dim: '#282828',
        shadow: '#E7E7E7',
      },
    },
  },
  plugins: [],
};
