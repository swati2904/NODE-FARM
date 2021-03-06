// With the help of require('fs'), we'll get the access to functions for
// reading data and writing data right to the file system.

//------------------------------core modules------------------------------------
const { O_DIRECTORY } = require('constants');
const fs = require('fs');
const http = require('http');
const url = require('url');

//----------------------------------third-party module---------------------------
// slug is basically the last part of URL that contains a unique string which identify
// the resource that the website is displaying....
const slugify = require('slugify');

//--------------------------own modules-----------------------------------
const replaceTemplate = require('./modules/replaceTemplate');

// const hello = 'Hello World';
// console.log(hello);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//----------------------------- FILES-------------------------------------

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

//------------------------------------ SERVER----------------------------------------

// const replaceTemplate = (temp, product) => {
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);

//     if(!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//     return output;
// }

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

// data read only first tie in the initial...
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// creating the array for all the slug...
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

//console.log(slugify('Fresh Avocados', {lower: true}));
// createServer call a callback function each time when the server will fired each time when the new request comes.

const server = http.createServer((req, res) => {
  // console.log(req.url);
  //-----------------Destructuring--------------------
  const { query, pathname } = url.parse(req.url, true);
  //const pathname = req.url;

  //---------------------Overview Page-----------------------------------
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    //console.log(cardsHtml);
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    //-------------------------- Product Page----------------------------------
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    //console.log(query);
    // retriving the element based on the query thing
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //-------------------------------- API---------------------------------------
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    //---------------------------------- Not Found---------------------------------
  } else {
    // http header is basically tell about the response that we are sending back.
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
