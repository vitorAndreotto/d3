/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@front/ui', '@front/api', '@repo/assets'],
    output: 'standalone',
    images: {
        disableStaticImages: false,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            type: 'asset'
        });
        return config;
    }
};

export default nextConfig;
