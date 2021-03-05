const http=require('http');
let url=require('url');

http.createServer(function(req, res){
    console.log("=======", req.url)
   let path=req.url;

   let trimmedpath=path.match(/^\/+/|/+$/)?path.replace(/^\/+/|/+$/g,''):path;
    res.write("<h1>Syed Hasnain Shaukat Abidi</h1>");
    res.end();
    console.log("Request recieved on path : " + trimmedpath);

}).listen(process.env.PORT|5000 , ()=>{
    console.log("Yes Server is listening on port : 8080");
});

