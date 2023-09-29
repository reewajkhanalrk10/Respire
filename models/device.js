const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const {User}=require('./user.js');

const DeviceSchema=new Schema({
    SerialNumber:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        reference:User
    },
    location:{
        type:String,
        required:true
    }
})