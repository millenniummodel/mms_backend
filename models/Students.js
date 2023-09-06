const mongoose = require('mongoose')

const tcDetailsSchema = new mongoose.Schema({
    dol: { type: String, default:"" },
    issueDate: { type: String, default: "" },
    passed: { type: String, default:"Yes"},
    certificateNo:{type:String, default:""}
  });

const StudentSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        mName: {type: String, required: true},
        fName: {type: String, required: true},
        address: {type: String, required: true},
        nationality: {type: String, required:true},
        dob: {type: String, required: true},
        doa: {type: String, required: true},
        phNo: {type: String, required: true},
        photo: {type: String, required:true},
        class: {type: String, required: true},
        rollNo: {type: Number, required:true},
        admNo: {type: String, required: true, unique: true},
        tc: {type: String, required:true},
        category: {type: String, required: true},
        gender: {type: String, required: true},
        aadhar: {type: String, required: true},
        sssm: {type: String, required: true},
        admClass:{type:String,required:true},
        tcDetails:tcDetailsSchema
    },
    {timestamps: true}
)

module.exports = mongoose.model("Student", StudentSchema)