const Notice=require('../models/Notice')


// create notice

exports.createNotice=async(req,res)=>{
    const newNotice=new Notice(req.body)

    try{
        const savedNotice=await newNotice.save()

        res.status(200).json({
            success:true,
            message:"Successfully created!",
            data:savedNotice
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// update notice

exports.updateNotice=async(req,res)=>{
    const id=req.params.id
    try{
        const updatedNotice=await Notice.findByIdAndUpdate(id,{$set:req.body},{new:true})

        res.status(200).json({
            success:true,
            message:"Successfully updated!",
            data:updatedNotice
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// delete notice

exports.deleteNotice=async(req,res)=>{
    const id=req.params.id
    try{
        await Notice.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:"Successfully deleted!",
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// get all notices

exports.getAllNotices=async(req,res)=>{
    try{
        const allNotices=await Notice.find({})

        res.status(200).json({
            success:true,
            message:"Successfull!",
            size:allNotices.length,
            data:allNotices
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}


// get single notice

exports.getSingleNotice=async(req,res)=>{
    const id=req.params.id

    try{
        const notice=await Notice.findById(id)

        res.status(200).json({
            success:true,
            message:"Successfull!",
            data:notice
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}


// get top notices

exports.getTopNotices=async(req,res)=>{
    try{
        const topNotices = await Notice.find({}).sort({createdAt: -1}).limit(10);

        res.status(200).json({
            success:true,
            message:"Successfull!",
            size:topNotices.length,
            data:topNotices
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}