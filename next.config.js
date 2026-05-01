/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['formly.vip', 'lh3.googleusercontent.com'] },
  async headers() {
    return [{
      source: '/:path*',
      headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }]
    }];
  }
};
module.exports = nextConfig;