const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    mode: 'development',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/static'),
                    to: './static'
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            minify: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules|build/,
                use: {
                    loader: 'babel-loader', // Используем Babel для обработки JS файлов
                    options: {
                        presets: ['@babel/preset-env'], // Пресет для преобразования ES6+
                    },
                },
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.hbs'],
    },
};
