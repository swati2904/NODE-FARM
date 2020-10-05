const { O_DIRECTORY } = require('constants');
const fs = require('fs');
const http = require('http');
const url = require('url');



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
    console.log(req.url);

    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the overview');
    }else if (pathName === '/product'){
        res.end('This is the product');
    }else if(pathName === '/api'){
        fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8', (err, data) => {
            const productData = JSON.parse(data);
           // console.log(productData);
           res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    });
    }else{
        // http header is basically tell about the response that we are sending back.
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-own-header':'hello-world'
        });
    res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000,'127.0.0.1', ()=> {
    console.log('Listening to request on port 8000');
});
