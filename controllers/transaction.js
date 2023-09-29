const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
const{User}=require("../models/user.js")
const{Device}=require("../models/device.js")
require('dotenv').config()

//Create your Hedera Testnet client
const client = Client.forTestnet();
//Set your account as the client's operator
client.setOperator(myAccountId, myPrivateKey);
//Set the default maximum transaction fee (in Hbar)
client.setDefaultMaxTransactionFee(new Hbar(1000));
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
        const receiveraccountid=receivercheck.accountid;
        const devicedata=Device.aggregate([
                        {$match: { ownername:receiver}},
                        { $group: {
                            _id: null,
                            total: {$sum: "$points"}}
                        }]);
        
        const totalpoints=devicedata.total
        const amount=totalpoints*10
        // Create the transfer transaction
        const sendHbar = await new TransferTransaction()
        .addHbarTransfer(myAccountId, Hbar.fromTinybars(-amount))
        .addHbarTransfer(receiveraccountid, Hbar.fromTinybars(amount))
        .execute(client);

        // Verify the transaction reached consensus
        const transactionReceipt = await sendHbar.getReceipt(client);
        const output=
        `The transfer transaction from my account to the new account was: ${transactionReceipt.status.toString()}
        Amount:${amount} transferred to account:${receiveraccountid}
        `
        Device.updateMany(
                { ownername:receiver },
            { $set: { points: 0 } }
          );
        res.staus(200).json(output)
    }
    catch(error){console.log(error)}
}