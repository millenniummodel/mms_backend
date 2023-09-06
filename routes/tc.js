const express=require('express')

const tcController=require('../controllers/tcController')
const { verifyTokenAndAdmin } = require('./verifyToken')

const router=express.Router()

router.put('/issuetc',verifyTokenAndAdmin,tcController.issueTC)

module.exports=router