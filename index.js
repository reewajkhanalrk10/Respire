console.log("Hello World!")
const https=require('https')
const app=require('./app')

var bytecodeFileId
let newContractId

    const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction,ContractCreateTransaction,ContractId,FileCreateTransaction,ContractFunctionParameters } = require("@hashgraph/sdk");
    require('dotenv').config()
    const fs = require('fs');
    
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;
    //Create your Hedera Testnet client
    const client = Client.forTestnet();
    //Set your account as the client's operator
    client.setOperator(myAccountId, myPrivateKey);
    //Set the default maximum transaction fee (in Hbar)
    client.setDefaultMaxTransactionFee(new Hbar(100));
    //Set the maximum payment for queries (in Hbar)
    client.setMaxQueryPayment(new Hbar(50));
    
    
    // Define the path to your .bin file
const createfile=async()=>{
try{
    const contractBytecode = fs.readFileSync("./contractbyte.bin");
    // console.log(fs.readFileSync("./contractbyte.bin").byteLength);
    //Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
    // console.log(1.1)
    // Create a FileCreateTransaction and set its contents
    fileCreateTx.setContents(contractBytecode);
    // console.log(2.2)
    // Freeze the transaction and execute it as needed
    fileCreateTx.freezeWith(client)
    // console.log(3.3)
    const transactionReceipt = await fileCreateTx.execute(client);
    // console.log(transactionReceipt)
    // console.log(1);
    // Get the receipt of the file create transaction
    const fileReceipt = await transactionReceipt.getReceipt(client);
    // console.log(2);
    // Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId;
    // console.log(3);
    // Return bytecodeFileId or perform additional actions
    return bytecodeFileId
  
}
catch (Error){console.log(1,Error)}
}




const gas=100000 
const contractinstance=async (bytecodeFileId) =>{
    // console.log(bytecodeFileId);
    // Instantiate the contract instance
    const contractTx = new ContractCreateTransaction()
    //Set the file ID of the Hedera file storing the bytecode
    .setBytecodeFileId(bytecodeFileId)
    //Set the gas to instantiate the contract
    .setGas(gas)
    //Provide the constructor parameters for the contract
    .setConstructorParameters(new ContractFunctionParameters().addString("Hello from Hedera!"));
    
    console.log(2)
    //Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(client);
    
    //Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(client);
    
    //Get the smart contract ID
    const newContractId = contractReceipt.contractId;
    const ContractAdress=newContractId.toSolidityAddress();
    return newContractId
    }
(async function (){
    bytecodeFileId=await createfile()
    console.log("The smart contract byte code file ID is " + bytecodeFileId+typeof(bytecodeFileId));
    newContractId = await contractinstance(bytecodeFileId);
    console.log("The newContractId " + newContractId)
    const datacontract={newContractId,myAccountId}
    // console.log(0,data)
    module.exports ={datacontract,increasePoints}
})()


const increasePoints=async(accountId, contractId, amount)=>{
 try {
      const contract = ContractId.fromString(contractId);
    
         // Call the contract function to increase points
         const txResponse = await new ContractCallQuery()
                 .setContractId(contract)
                .setGas(100000) // Adjust the gas as needed
                .setFunction("increasePoints") // Replace with the actual function name
                .addString(accountId) // Pass the user's account ID as an argument
                .execute(client);
    
            // Wait for the transaction to complete
          await txResponse.getReceipt(client);
          console.log(`Points increased for account ${accountId} by ${amount}.`);
        } catch (error) {
            console.error("Error increasing points:", error);
        } 
}

const routes=require('./routes/routes.js')
app.use('/api',routes)
app.get('/',(req,res)=>{console.log("Hello World");res.status(200).json({"message":"Hello World"})})


// need o update