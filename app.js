const express=require("express")
const {dbconnect}= require("./database.js")
const cors=require("cors")
const bodypaser=require("body-parser")
const app=express()
dbconnect();
const PORT =3000;
const middleware=()=>{
    app.use(express.json())
    app.use((req, res,next)=>{
        console.log(`${req.url} and ${req.method}`)
        // without next shit goes down real fast
        next()
    })
}
const environmentSetup=async()=>{

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    // If we weren't able to grab it, we should throw a new error
    if (!myAccountId || !myPrivateKey) {
        throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }
}


app.use(bodypaser.urlencoded({extended:true}))


app.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)})
environmentSetup();
middleware()


module.exports=app;