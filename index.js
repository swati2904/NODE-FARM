const fs = require('fs');
const http = require('http');
// const hello = 'Hello World';
// console.log(hello);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FILES

// Blocking synchronous call

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8',);
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs,fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// Non-Blocking synchronous call

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//         console.log(data3);
        
//         fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//             console.log('you file has been written');
//         });

//         });
//     });
// });
// console.log("Will Read File");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SERVER

// createServer call a callback function each time when the server will fired each time when the new request comes.

const server = http.createServer((req, res) => {
    console.log(req);
    res.end('Hello from the server');
});

server.listen(8000,'127.0.0.1', ()=> {
    console.log('Listening to request on port 8000');
});
