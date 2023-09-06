const express=require('express')

const studentController=require('../controllers/studentController')

const router=express.Router()
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')



router.post('/token/verify',studentController.getStudentByToken)
router.post('/createstudent',verifyTokenAndAdmin,studentController.createStudent)
router.post('/insertmultiplestudents',verifyTokenAndAdmin,studentController.insertMultipeStudents)
router.get('/getstudent/:admNo',studentController.getStudentByAdmNo)
router.get('/getstudentbyid/:id',verifyTokenAndAuthorization,studentController.getStudentById)
router.get('/searchstudent',verifyTokenAndAuthorization,studentController.searchStudents)
router.get('/countstudents',verifyTokenAndAuthorization,studentController.countStudents)
router.put('/updatestudentbyid/:id',verifyTokenAndAuthorization,studentController.updateStudentById)
router.delete('/deletestudent/:id',verifyTokenAndAdmin,studentController.deleteStudentById)
router.get('/getcurrentstudents',verifyTokenAndAuthorization,studentController.getCurrentStudents)
router.get('/getstudentsbyclass/:cls',studentController.getStudentsByClass)
router.put('/updateclass',verifyTokenAndAdmin,studentController.updateClassandRollNo)


module.exports=router 