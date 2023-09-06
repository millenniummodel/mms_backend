const express=require('express')
const facultyController=require('../controllers/facultyController')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')



const router=express.Router()

router.get('/',facultyController.getAllFaculties)
router.get('/:id',verifyTokenAndAdmin,facultyController.getSingleFaculty)
router.put('/:id',verifyTokenAndAdmin,facultyController.updateFaculty)
router.delete('/:id',verifyTokenAndAdmin,facultyController.deleteFaculty)
router.post('/',verifyTokenAndAdmin,facultyController.createFaculty)

module.exports=router
