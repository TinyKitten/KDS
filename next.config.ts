import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: JSON.parse(process.env.ALLOWED_DEV_ORIGINS || "[]"),
  output: "standalone",
};

export default nextConfig;
