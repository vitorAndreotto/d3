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
        }, {
            test: /\.(mp4|webm|ogg)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/media/[name][ext]'
            }
        }, {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'static/images/[name][ext]'
            }
        });
        return config;
    }
};

export default nextConfig;