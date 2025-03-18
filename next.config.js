
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.mp3$/,
            use: 'file-loader',
        });
        return config;
    },
};

module.exports = nextConfig;
