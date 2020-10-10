// With the help of require('fs'), we'll get the access to functions for 
// reading data and writing data right to the file system.

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

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); 
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

// data read only first tie in the initial...
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

// createServer call a callback function each time when the server will fired each time when the new request comes.

const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathName = req.url;

    //Overview Page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        //console.log(cardsHtml);
       const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    // Product Page
    }else if (pathName === '/product'){
        res.end('This is the product');

    // API
    }else if(pathName === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);

    // Not Found
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
