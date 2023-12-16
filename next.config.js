/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ACTION_CONTRACT_ADDRESS: process.env.ACTION_CONTRACT_ADDRESS,
    ATF_TOKEN_CONTRACT_ADDRESS: process.env.ATF_TOKEN_CONTRACT_ADDRESS,
    MARKETPLACE_CONTRACT_ADDRESS: process.env.MARKETPLACE_CONTRACT_ADDRESS,
    TZKT_API: process.env.TZKT_API,
    ENCRYPTION_KEY_STRING: process.env.ENCRYPTION_KEY_STRING,
    API_URL: process.env.API_URL,
  },
};
