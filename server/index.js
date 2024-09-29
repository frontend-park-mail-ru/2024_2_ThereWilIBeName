const express = require('express');
const path = require('path');
const fs = require('fs');

const SERVER_PORT = 3002;

const server = express();

//Не срабатывает для файлов (с расширением)
server.get(/^[^.]*(?!\.\w*)$/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

server.use(express.static(__dirname + '/../'));

server.listen(SERVER_PORT, () => {})
console.log(`SERVER LISTENING ON PORT ${SERVER_PORT}`);
