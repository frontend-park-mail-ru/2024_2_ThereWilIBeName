const http = require('http');
const fs = require('fs');

const SERVER_PORT = 3002;

const server = http.createServer((req, res) => {
    
  const {url} = req;
  console.log(`Запрошенный адрес: ${url}`);

    const filePath = (url === '/') ? '/index.html' : url;
    fs.readFile(`${__dirname}/../public${filePath}.html`, function(error, data){
              
        if(error){
            res.statusCode = 404;
            res.end("Resourse not found!");
        }   
        else{
            res.end(data);
        }
    });

});

console.log(`SERVER LISTENING ON PORT ${SERVER_PORT}`);
server.listen(SERVER_PORT);
