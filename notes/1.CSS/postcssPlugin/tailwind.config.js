/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      spacing: {
        '96': '24rem',
        '320': '80rem'
      },
      colors: {
        black: 'luyi(cb)',
        white: 'luyi(cw)',
        gray: {
          50: 'luyi(cg05)',
          100: 'luyi(cg10)',
          // 50:'#111827',
          // 100:'#1f2937',
          // 200: '#374151',
          // 300: '#4b5563',
          // 400: '#6b7280',
          // 500: '#9ca3af',
          // 600: '#d1d5db',
          // 700: '#E5E7EB',
          // 800: '#F3F4F6',
          // 900: '#F9FAFB'
        },
        blue: {
          50:'#00b96b',
          100:'#F3F4F6',
          200: '#E5E7EB',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
