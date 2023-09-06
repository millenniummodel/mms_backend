const router = require('express').Router()
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const userController=require('../controllers/userController')



// get user by token
router.post('/token/verify', verifyTokenAndAuthorization, userController.getUserByToken)

//create user
router.post('/register', verifyTokenAndAdmin, userController.createUser)

//change type - update
router.put('/updateuser/:id', verifyTokenAndAdmin, userController.changeUserType)

//get all users 
router.get('/getusers', verifyTokenAndAdmin, userController.getAllUsers)

//delete user
router.delete('/deleteuser/:id', verifyTokenAndAdmin, userController.deleteUser)



module.exports = router
