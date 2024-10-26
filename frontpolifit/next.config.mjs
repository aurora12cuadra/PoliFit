/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@fullcalendar/core/locales/es': '@fullcalendar/core/locales/es.js',
      };
      return config;
    },
  };
  
  export default nextConfig;
  