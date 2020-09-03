const http = require("http");
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    if(req.url == '/'){
        fs.readFile(path.join(__dirname,'views','index.html'),'utf-8',(err,data)=>{
            if(err) throw err
            res.end(data)
        })
    }else if(req.url === '/about'){
        fs.readFile(path.join(__dirname,'views','about.html'),'utf-8',(err,data)=>{
            if(err) throw err
            res.end(data) 
        })
    }else if(req.url === '/api/users'){
        res.writeHead(200,{
            "Content-Type": "text/json" 
        })
        const users=[
            {name:'Tony',age:33},
            {name:'Hony',age:17},
        ]
        res.end(JSON.stringify(users))
    }

  } else if (req.method === "POST") {
    const body = [];
    res.writeHead(200,{
        "Content-Type": "text/html; charset=utf-8"
    })

    req.on("data", (data) => {
      body.push(Buffer.from(data));
      console.log(body);
    });
    req.on("end", () => {
      const mes = body.toString().split("=")[1];
      res.end(`
            <h2>Your mess: ${mes} </h2>
        `);
    });
  }
});

server.listen(3000, () => {
  console.log("server is rinning");
});
