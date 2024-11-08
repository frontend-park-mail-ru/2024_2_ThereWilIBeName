const path = require('path');
const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.config.js');
const ip = require('ip');

const infoColor = (message) =>
    `\u001b[1m\u001b[34m${message}\u001b[39m\u001b[22m`;

module.exports = merge(commonConfiguration, {
    stats: 'errors-warnings',
    mode: 'development',
    infrastructureLogging: {
        level: 'warn',
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        open: true,
        allowedHosts: 'all',
        hot: true,
        watchFiles: ['src/**'],
        static: {
            watch: true,
            directory: path.join(__dirname, '/build'),
        },
        client: {
            logging: 'none',
            overlay: false,
            progress: false,
        },
        historyApiFallback: true,
        server: {
            type: 'http',
        },
        setupMiddlewares: (middlewares, devServer) => {
            const port = devServer.options.port;
            const localIp = ip.address();
            const domain1 = `http://${localIp}:${port}`;
            const domain2 = `http://localhost:${port}`;

            console.log(
                `Проект запущен на:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`
            );

            return middlewares;
        },
    },
});
