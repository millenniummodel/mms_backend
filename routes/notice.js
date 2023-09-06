const express=require('express')

const noticeController=require('../controllers/noticeController')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')


const router=express.Router()

router.get('/',verifyTokenAndAdmin,noticeController.getAllNotices)
router.get('/getTopNotices',noticeController.getTopNotices)
router.get('/:id',noticeController.getSingleNotice)
router.post('/',verifyTokenAndAdmin,noticeController.createNotice)
router.put('/:id',verifyTokenAndAdmin,noticeController.updateNotice)
router.delete('/:id',verifyTokenAndAdmin,noticeController.deleteNotice)

module.exports=router