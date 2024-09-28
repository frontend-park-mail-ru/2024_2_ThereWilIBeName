const express = require('express');
const path = require('path');
const fs = require('fs');

const SERVER_PORT = 3002;

const server = express();

// console.log(__dirname);


server.get(/^[^.]*(?!\.\w*)$/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
})

server.use(express.static(__dirname + '/../'));

server.listen(SERVER_PORT, () => {})
console.log(`SERVER LISTENING ON PORT ${SERVER_PORT}`);

// const server = http.createServer((req, res) => {
//
//     const {url} = req;
//     console.log(`Запрошенный адрес: ${url}`);
//
//     const filePath = (url === '/') ? '/index.html' : url;
//     fs.readFile(`${__dirname}/../${filePath}`, function(error, data){
//
//         if (error) {
//             res.statusCode = 404;
//             res.end("Resourse not found!");
//         } else {
//             res.end(data);
//         }
//     });
//
// });
//

// server.listen(SERVER_PORT);
