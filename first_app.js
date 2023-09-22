const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {

    // console.log(req.url)
    const url = req.url;
    const method= req.method;
    if(url==='/'){
        fs.readFile("message.txt",{encoding: "utf-8"}, (err,data) =>{
            if(err){
                console.log(err);
            }
            console.log('data from file' + data);
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
            res.write('</html>');
            return res.end();
        })
        
    }

    else if(url==='/message' && method==='POST'){
        const body = [];
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err)=>{
                if(err){
                    console.log(err);
                }
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        })        
    }
    else{
        res.setHeader('Content-Type','text/html');
        res.write('<html><body><h1>Welcome to Node JS</h1></body></hmtl>');
        res.end();
    }  
});


server.listen(4000)
