const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    mode: 'development',
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
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.hbs'],
    },
};
