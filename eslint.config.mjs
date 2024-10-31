import path from 'node:path';
import url from 'node:url';
import pluginJs from '@eslint/js';
import pluginTs from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default [

    // Базовая конфигурация ESLint для JavaScript
    pluginJs.configs.recommended,

    {
        ignores: ['server/*', 'webpack.config.js', 'build/*'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: path.resolve(__dirname, './tsconfig.json'),
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            '@typescript-eslint': pluginTs,
        },
        rules: {
            // Неиспользуемые переменные
            'no-unused-vars': ['warn'],
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