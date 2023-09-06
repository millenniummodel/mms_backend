const mongoose = require('mongoose')

const studentResultSchema = new mongoose.Schema(
    {
        admNo:{type:String},
        cls:{type:String},
        studentDetails:{type:mongoose.Types.ObjectId, ref:"Student"},
        attendence:{type:String},
        subjects:[{type:String}],
        halfYearlyMax:{type:String},
        halfYearlyObt:[{type:String}],
        annualMax:{type:String},
        annualObt:[{type:String}],
        values:[{type:String}]
    },
    { timestamps: true }
)


const ResultSchema = new mongoose.Schema(
    {
        acadYear:{type:String, unique:true},
        results: [studentResultSchema]
    },
    { timestamps: true }
)

module.exports = mongoose.model("Result", ResultSchema)