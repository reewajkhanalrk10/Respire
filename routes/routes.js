const express =require('express')
const{ReqAuth}=require('../middleware/auth.js')
const{Login,SignUp}=require("../controllers/user.js")
const{pollutiondata}=require("../controllers/pollution.js")
const{getpredictions}=require("../controllers/predict.js")
const router=express.Router();

router.post('/signup',SignUp);
router.post('/login',Login);

router.use(ReqAuth)
router.post('/pollution',pollutiondata)
router.post('/predict',getpredictions)
module.exports =router