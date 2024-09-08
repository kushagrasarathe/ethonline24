/** @type {import('next').NextConfig} */
import webpack from "webpack";

// const nextConfig = {};

// export default nextConfig;

const nextConfig = {
  // Can be safely removed in newer versions of Next.js
  // future: {
  //   // by default, if you customize webpack config, they switch back to version 4.
  //   // Looks like backward compatibility approach.
  //   webpack5: true,
  // },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped.
        ...config.resolve.fallback,

        fs: false, // the solution
        net: false,
        tls: false,
        crypto: "crypto-browserify",
        stream: "stream-browserify",
        url: "url",
        zlib: "browserify-zlib",
        http: "stream-http",
        https: "https-browserify",
        assert: "assert",
        os: "os-browserify",
        path: "path-browserify",
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        })
      );
    }
    return config;
  },
};

export default nextConfig;

// transpilePackages: ["ssv-keys", "ssv-scanner"],
