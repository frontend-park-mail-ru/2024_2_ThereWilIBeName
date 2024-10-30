import globals from 'globals';

export default [
    {
        languageOptions: {
            globals: {...globals.browser},
        }},
    {
        ignores: ['server/*', 'webpack.config.js', 'build/*'],
    },
    {
        files: ['*.styl'],
        rules: {
            // Точки с запятой
            semi: ['error', 'never'],
            // Пустая строка
            'eol-last': ['error', 'always'],
        },
    },
    {
        files: ['*.ts'],
        rules: {
            // Точки с запятой
            semi: ['error', 'always'],
            // Отступы
            'indent': ['error', 4],
            // Макс длина строки
            'max-len': ['warn', { 'code': 100 }],
            // Без var
            'no-var': ['error'],
            // Пробелы вокруг операторов
            'space-infix-ops': ['error'],
            // Строгие сравнения
            'eqeqeq': ['error', 'always'],
            // Без консольных выводов
            'no-console': ['warn'],
            // Пробелы в функциях до аргументов
            'space-before-function-paren': ['error', {
                anonymous: 'always',
                named: 'never',
            }],
            // Одинарные кавычки
            'quotes': ['error', 'single'],
            // Пробел перед блоком кода функций
            'space-before-blocks': ['error', 'always'],
            // Пустая строка
            'eol-last': ['error', 'always'],
        }
    }
];