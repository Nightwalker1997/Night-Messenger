/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "*.googleusercontent.com",//lh3.googleusercontent.com
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "*.githubusercontent.com",//avatars.githubusercontent.com
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
            port: "",
            pathname: "**",
          },
        ],
    }
}

 
module.exports = withNextIntl(nextConfig);