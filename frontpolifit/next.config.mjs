import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true, // Habilitar modo estricto de React
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Aumentar el límite de tamaño del cuerpo de la solicitud
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@fullcalendar/core/locales/es': '@fullcalendar/core/locales/es.js', // Alias para módulo específico
    };
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);


