/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sample-videos.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      // YouTube thumbnails
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      // News sources
      {
        protocol: 'https',
        hostname: 'ml.globenewswire.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vox-cdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'techcrunch.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'venturebeat.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.artificialintelligence-news.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wp.technologyreview.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Generic news image sources
      {
        protocol: 'https',
        hostname: '*.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      // CloudFront CDN
      {
        protocol: 'https',
        hostname: 'd15shllkswkct0.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      // Catch-all for common news domains
      {
        protocol: 'https',
        hostname: '*.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs', 'jsonwebtoken']
  },
  // Webpack configuration for better module resolution
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Ensure API routes work properly on Netlify
  trailingSlash: false
}

module.exports = nextConfig
