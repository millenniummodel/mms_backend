const Faculty=require('../models/Faculty')


// Create faculty

exports.createFaculty=async(req,res)=>{
    const newFaculty=new Faculty(req.body)

    try{
        const savedFaculty=await newFaculty.save()

        res.status(200).json({
            success:true,
            message:"Successfullly created",
            data:savedFaculty
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// get all faculties

exports.getAllFaculties=async(req,res)=>{
    

        try{
            const faculties =await Faculty.find({})

            res.status(200).json({
                success:true,
                message:"Successfull",
                size:faculties.length,
                data:faculties
            })
        }
        catch(err){
            res.status(404).json({
                success: false,
                message: err.message
            })
        }
}


// get single faculty

exports.getSingleFaculty=async(req,res)=>{
    const id=req.params.id

    try{
        const faculty =await Faculty.findById(id)

        res.status(200).json({
            success:true,
            message:"Successfull",
            data:faculty
        })
    }
    catch(err){
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}


// update faculty

exports.updateFaculty=async(req,res)=>{
    const id=req.params.id

    try{
        const updatedFaculty =await Faculty.findByIdAndUpdate(id,{$set:req.body},{new:true})

        res.status(200).json({
            success:true,
            message:"Successfully updated",
            data:updatedFaculty
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// delete faculty

exports.deleteFaculty=async(req,res)=>{
    const id=req.params.id

    try{
        await Faculty.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:"Successfully deleted",
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}