const http=require('http');
const url=require('url');
const queryString=require('querystring');
// import {config} from './config.js';
let config =require('./config');

let StringDecoder = require('string_decoder').StringDecoder;

let unifiedServer=(req,res) => {
    let parsedUrl=url.parse(req.url,true);
    let path=parsedUrl.pathname;
    let trimmedPath=path.replace(/^\/+|\/+$/g , ''); 
    let method=req.method.toLowerCase();
 //    console.log(queryString.parse(req.url));
    let qrys=parsedUrl.query;
 //    console.log(qrys);
 let headers =req.headers;
     // console.log("Request recieved on these headers : ",headers);
   
 //    console.log("Request path recieved on : " + trimmedPath + " with query string : " , qrys);
 
 let decoder=new StringDecoder('utf-8');
 let buffer='';
 req.on('data', function(data) {    
     buffer+=decoder.write(data);
     //console.log(buffer);
 })
 req.on('end', function() {
     buffer+=decoder.end();
     // res.end("Hello World \n Syed Hasnain Shaukat Abidi");
     // console.log(buffer);
     console.log("Request recieved with this payload : ", buffer);
 
     let handlers={};
 
     handlers.ping = function(data , callback) {
         callback(200);
     }
     
     handlers.notFound= function(data , callback) {
         callback(404);
     }
     
     let router ={
         ping : handlers.ping,
     }
 
     let chosenHandler = typeof(router[trimmedPath]) !== "undefined" ? router[trimmedPath] : handlers.notFound;
     let data={
     'trimmedPath': trimmedPath ,
     'queryStringObject' : qrys ,
     'method' : method,
     'headers': headers , 
     'payload' : buffer
     }
 
     chosenHandler(data , function(statusCode, payload) {
     statusCode= typeof(statusCode) == 'number' ? statusCode : 200;
     payload = typeof(payload) == 'object' ? payload : {};
     payloadString=JSON.stringify(payload);
 
     res.setHeader('Content-Type', 'application/json');
     res.writeHead(statusCode);
     res.end(payloadString);
     console.log("Returning this response : " , statusCode , payloadString);
 })
 })
}

http.createServer(function(req, res){
    unifiedServer(req,res);
}).listen(config.port || 7000 , ()=>{
    console.log(`Server is listening on ` , config.port , 'with mode ' , config.mode);
});