/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001'],
    },
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize for static generation
  trailingSlash: false,
  generateBuildId: async () => {
    // Use git commit hash or timestamp for build ID
    return `build-${Date.now()}`;
  },
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Enhanced webpack config for MDX
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Add support for additional file types if needed
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    });

    // Optimize for production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            mdx: {
              test: /[\\/]node_modules[\\/](@mdx-js|next-mdx-remote)[\\/]/,
              name: 'mdx',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };
    }

    return config;
  },
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/principle/:slug',
        destination: '/book/:slug',
        permanent: true,
      },
    ];
  },
  // Headers for performance
  async headers() {
    return [
      {
        source: '/book/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
