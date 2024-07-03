/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        config.module.rules.push({
            test: /pdf\.worker\.(min\.)?js/,
            use: 'file-loader',
        });

        return config;
    },
};

export default nextConfig;
