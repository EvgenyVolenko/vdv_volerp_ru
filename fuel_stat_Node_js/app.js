'use strict';

const port = 3000;
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF8'
        });
        res.end(`<h1>Server started ${clearData.Available}</h1>`);
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF8'
        });
        res.end('<h1>No Page!!!</h1>');
    }
});

server.listen(port, () => {
    console.log('Server on port ' + port);
});


const getData = async () => {
    try {
        const res = await fetch('https://lkapi.rn-card.ru/api/emv/v1/GetContractBalance?u=WebAPI&contract=ISS036434&type=json', {
            method: 'GET',
            headers: {
                'RnCard-Identity-Account-Pass': 'M2ExMzVhYjg5MGFjMmFmZTY3MDdlODk1OGI1Mjc3Mzc='
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

// const fetchData = Promise.resolve(getData());
const pathToFile = path.join(__dirname, 'data.json ');

// fetchData.then(value => fs.writeFileSync(pathToFile, JSON.stringify(value, null, 3)));

let clearData = {};

if (fs.existsSync(pathToFile)) {
    clearData = JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
} else {
    fs.writeFileSync(pathToFile, JSON.stringify(clearData, null, 3));
    console.log('File not found! Created new file');
}

clearData = JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
console.log(clearData);

console.log(clearData.Available);