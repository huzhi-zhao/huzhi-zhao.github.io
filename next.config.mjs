/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    // 项目卡的占位图临时托管在外部（2026-08-21）。
    // P5 图片资产就绪、图挪进 /public 之后，这两条应当删掉。
    remotePatterns: [
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
