const express = require('express');
const path = require('path');
const fs = require('fs');

const SERVER_PORT = 3002;

const server = express();

/**
 * Маршрут для обработки всех запросов, которые не содержат расширений файлов (например, HTML5 History API).
 * Если запрос не содержит расширения файла, сервер возвращает файл `index.html`.
 *
 * @param {Object} req - Экземпляр запроса.
 * @param {Object} res - Экземпляр ответа.
 */
server.get(/^[^.]*(?!\.\w*)$/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

/**
 * Middleware для обслуживания статических файлов из родительской директории проекта.
 * Используется для отдачи CSS, JS, изображений и других статических файлов.
 */
server.use(express.static(__dirname + '/../'));

/**
 * Запускает сервер и слушает на указанном порту.
 * Выводит сообщение в консоль при успешном запуске.
 */
server.listen(SERVER_PORT, () => {})
console.log(`SERVER RUNNING ON:  localhost:${SERVER_PORT}`);