const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
const{User}=require("../models/user.js")
const{Device}=require("../models/device.js")
require('dotenv').config()
const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

const makepayment=async(req,res)=>{
    const receiver=getusername(req,res)
    try{
        const receivercheck= await User.findOne({username:receiver})
        if(!receivercheck){throw new Error("Don't have account for transaction")}
        const devicecheck=await User.find
    }
    catch(error){console.log(error)}
}