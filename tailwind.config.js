/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#3c4043',
          900: '#202124'
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        },
        warm: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.8',
            fontSize: '16px',
            h1: {
              fontSize: '2.5rem',
              fontWeight: '300',
              lineHeight: '1.2',
              marginBottom: '2rem'
            },
            h2: {
              fontSize: '2rem',
              fontWeight: '300',
              lineHeight: '1.3',
              marginBottom: '1.5rem'
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '400',
              lineHeight: '1.4',
              marginBottom: '1rem'
            },
            p: {
              marginBottom: '1.5rem',
              fontSize: '16px'
            },
            blockquote: {
              borderLeftColor: '#e0cec7',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'normal',
              color: '#6b7280'
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('./src/styles/plugins.js'),
  ],
}