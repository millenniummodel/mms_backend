const router = require('express').Router()
const { studentLogin, userLogin } = require('../controllers/authController')


router.post('/student-login', studentLogin)

router.post('/user-login', userLogin)


module.exports = router