const Result = require('../models/Result')
const Student = require('../models/Students')

// create result object (admin)

exports.createAcadYear = async (req, res) => {
    const category = { "Nursery": 0, "LKG": 0, "UKG": 0, "1st": 1, "2nd": 1, "3rd": 1, "4th": 1, "5th": 1, "6th": 2, "7th": 2, "8th": 2, "9th": 2, "10th": 2, "11th": 2, "12th": 2 }
    const subjectsArr = [
        ["Hindi [W]", "Hindi [O]", "English [W]", "English [O]", "Maths [W]", "Maths [O]"],
        ["Hindi", "English", "Ev.S", "Mathematics", "Computer", "G.K."],
        ["Hindi", "English", "Science", "So. Science", "Mathematics", "Sanskrit"]
    ]
    const halfYearlyMax = ['50', '50', '50']
    const annualMax = ['50', '100', '100']
    var currYearResultArr = [];

    try {

        const currStudents = await Student.find({ tc: "No" });

        currStudents.map((student) => {
            var studentResultObj = {
                admNo: student.admNo,
                cls: student.class,
                studentDetails: student._id,
                attendence: '-',
                subjects: subjectsArr[category[student.class]],
                halfYearlyMax: halfYearlyMax[category[student.class]],
                halfYearlyObt: ['-', '-', '-', '-', '-', '-'],
                annualMax: annualMax[category[student.class]],
                annualObt: ['-', '-', '-', '-', '-', '-'],
                values: ["A", "A", "A", "A", "A", "A"],
            }
            currYearResultArr.push(studentResultObj)
        })

        const newAcadYear = new Result(
            {
                acadYear: req.body.acadYear,
                results: currYearResultArr
            }
        )

        const savedAcadYear = await newAcadYear.save()

        res.status(200).json({
            success: true,
            message: "Successfullly created!",
            size: savedAcadYear.results.length,
            data: savedAcadYear
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}


// get acadYears

exports.getAcadYears = async (req, res) => {
    try{
        const acadYearResults=await Result.find()
        const acadYears=acadYearResults.map((acad)=>acad.acadYear)
        res.status(200).json({
            success: true,
            message: "Successfulll!",
            size: acadYears.length,
            data: acadYears
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



// update student result (admin)

exports.updateStudentResult = async (req, res) => {

    const yr = req.body.year
    const studentAdmNo = req.body.admNo
    const halfYearly = req.body.halfYearlyMarks
    const annual = req.body.annualMarks
    const values = req.body.values
    const attendence = req.body.attendence

    try {
        await Result.updateOne({ acadYear: yr, "results.admNo": studentAdmNo }, { $set: { "results.$.halfYearlyObt": halfYearly, "results.$.annualObt": annual, "results.$.values": values, "results.$.attendence": attendence } })

        return res.status(200).json({
            success: true,
            message: "Successfullly updated!"
            // data: data
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get student result by admNo (admin)

exports.getStudentResult = async (req, res) => {
    const yr = req.query.yr
    const admNo = req.query.admNo
    try {
        const acadYearResults = await Result.findOne({ acadYear: yr }).populate({
            path: 'results.studentDetails',
            select: 'name mName fName sssm aadhar dob'
        });
        if (!acadYearResults) {
            res.status(404).json({
                success: true,
                message: "Academic Year not found!",
                data: null
            })
        }
        const studentDetails = acadYearResults.results.filter(student => {
            return (student.admNo === admNo)
        })

        if (!studentDetails.length) {
            return res.status(404).json({
                success: true,
                message: "No record found!",
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            message: "Successfulll!",
            data: studentDetails[0]
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// get results by class (admin)
exports.getStudentResultByClass = async (req, res) => {
    const yr = req.query.yr
    const cls = req.query.cls
    try {
        const acadYearResults = await Result.findOne({ acadYear: yr }).populate({
            path: 'results.studentDetails',
            select: 'name mName fName sssm aadhar dob'
        });
        if (!acadYearResults) {
            return res.status(404).json({
                success: true,
                message: "Academic Year not found!",
                data: null
            })
        }
        const result = acadYearResults.results.filter(student => {
            return (student.cls === cls)
        })
        res.status(200).json({
            success: true,
            message: "Successfulll!",
            size: result.length,
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



// student result by yr, admNo and dob

exports.studentResult = async (req, res) => {
    const yr = req.query.yr
    const admNo = req.query.admNo
    const dob = req.query.dob
    try {
        const acadYearResult = await Result.findOne({ acadYear: yr }).populate({
            path: 'results.studentDetails',
            select: 'name mName fName sssm aadhar dob'
        });
        if (!acadYearResult) {
            return res.status(404).json({
                success: false,
                message: "Academic year not found!",
                data: null
            })
        }
        const studentResult = acadYearResult.results.filter((result) => {
            return (result.admNo === admNo)
        })
        if (!studentResult.length) {
            return res.status(404).json({
                success: false,
                message: "No record found!",
                data: null
            })
        }
        if (studentResult[0].studentDetails.dob !== dob) {
            return res.status(404).json({
                success: false,
                message: "Wrong DOB!",
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: "Successfulll!",
            data: studentResult[0]
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}