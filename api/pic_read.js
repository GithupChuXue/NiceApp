var http=require("http")

var fs=require("fs")

var app=http.createServer((req,res)=>{

    if(req.url=="/666"){

        res.setHeader("content-Type","image/png")

fs.readFile("./image/preview.png",(err,data)=>{

    if(!err){

        res.end(data)

    }

})

    }else{

        res.end("not found")

    }

})

app.listen(8888, () => {
    console.log('express server is running at http://127.0.0.1:8888')
})