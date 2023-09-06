const express= require('express')
const resultController=require('../controllers/resultController')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

const router=express.Router()

router.post('/createAcadYear',verifyTokenAndAdmin,resultController.createAcadYear)
router.get('/getAcadYears',verifyTokenAndAuthorization,resultController.getAcadYears)
router.put('/updateStudentResult',verifyTokenAndAuthorization,resultController.updateStudentResult)
router.get('/getStudentResult',verifyTokenAndAuthorization,resultController.getStudentResult)
router.get('/getStudentResultByClass',verifyTokenAndAuthorization,resultController.getStudentResultByClass)
router.get('/showStudentResult',resultController.studentResult)

module.exports=router