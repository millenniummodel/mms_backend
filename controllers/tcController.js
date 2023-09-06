const Students = require('../models/Students')

exports.issueTC=async(req,res)=>{
    const passed=req.body.passedStudents
    const failed=req.body.failedStudents
    const leavingDt=req.body.dol
    const issueDt=req.body.issueDate
    const passedStudents=passed?passed.split(' '):[]
    const failedStudents=failed?failed.split(' '):[]
    const combined=passedStudents.concat(failedStudents)
    try{
        const tcTaken = await Students.countDocuments({ tc: "Yes" })
        var curr=tcTaken+1

        const filter1={admNo:{$in:passedStudents}}
        const filter2={admNo:{$in:failedStudents}}

        const passedRes=await Students.find(filter1)
        const failedRes=await Students.find(filter2)

        const r1=passedRes.map(async (stDet)=>{
            await Students.findByIdAndUpdate(stDet._id, {$set:{"tc":"Yes","tcDetails.certificateNo":curr++,"tcDetails.dol":leavingDt,"tcDetails.issueDate":issueDt,"tcDetails.passed":"Yes"}})
        })

        await Promise.all(r1);

        const r2=failedRes.map(async (stDet)=>{
            await Students.findByIdAndUpdate(stDet._id, {$set:{"tc":"Yes","tcDetails.certificateNo":curr++,"tcDetails.dol":leavingDt,"tcDetails.issueDate":issueDt,"tcDetails.passed":"No"}})
        })

        await Promise.all(r2);

        const studentData=await Students.find({admNo:{$in:combined}})

        res.status(200).json({
            message:"Successfull!",
            data:studentData
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}