const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
const{User}=require("../models/user.js")
const{Device}=require("../models/device.js")
require('dotenv').config()

//Create your Hedera Testnet client
const client = Client.forTestnet();
//Set your account as the client's operator
client.setOperator(myAccountId, myPrivateKey);
//Set the default maximum transaction fee (in Hbar)
client.setDefaultMaxTransactionFee(new Hbar(20));
//Set the maximum payment for queries (in Hbar)
client.setMaxQueryPayment(new Hbar(10));
const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

const getpayment=async(req,res)=>{
    const receiver=getusername(req,res)
    try{
        const receivercheck= await User.findOne({username:receiver})
        if(!receivercheck){throw new Error("Don't have account for transaction")}
        const devicecheck=await User.find({owenername:receiver})
        if(!devicecheck){throw new Error("There is no device registered by you")}
    }
    catch(error){console.log(error)}
}