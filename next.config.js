/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tianrenheyi-medical-aesthetics' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/tianrenheyi-medical-aesthetics' : '',
}

module.exports = nextConfig