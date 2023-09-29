const express=require("express")
const {dbconnect}= require("./database.js")
const cors=require("cors")
const bodypaser=require("body-parser")
const app=express()
dbconnect();
const PORT =8888;
const middleware=()=>{
    app.use(express.json())
    app.use((req, res,next)=>{
        console.log(`${req.url} and ${req.method}`)
        // without next shit goes down real fast
        next()
    })
}

app.use(bodypaser.urlencoded({extended:true}))


app.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)})
middleware()
module.exports=app;