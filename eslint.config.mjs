import globals from 'globals';
import pluginJs from '@eslint/js';


export default [
    {languageOptions:{

        globals: {...globals.browser},

    }},
    pluginJs.configs.recommended,
    {
        ignores: ['server/*']
    },

    {
        rules: {
            //точки с запятой
            semi: ['error', 'always'],
            //отступы
            'indent': ['error', 4],
            //макс длина строки
            'max-len': ['warn', { 'code': 100 }],
            //без var
            'no-var': ['error'],
            //пробелы вокруг операторов
            'space-infix-ops': ['error'],
            //строгие сравнения
            'eqeqeq': ['error', 'always'],
            //без консольных выводов
            'no-console': ['warn'],
            //пробелы в функциях до аргументов
            'space-before-function-paren': ['error', {
                anonymous: 'always',
                named: 'never',
            }],
            //одинарные кавычки
            'quotes': ['error', 'single'],
            //пробел перед блоком кода функций
            'space-before-blocks': ['error', 'always'],
        }
    }
];