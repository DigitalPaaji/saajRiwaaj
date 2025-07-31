/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    domains: ['res.cloudinary.com'], 
    
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
    ],
  },
};

export default nextConfig;
