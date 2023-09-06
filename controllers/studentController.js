const jwt = require('jsonwebtoken')
const Student = require('../models/Students')


//get student by token

exports.getStudentByToken = async (req, res) => {
    const { token } = req.body
    try {
        const student = jwt.verify(token, process.env.JWT_SEC)
        const studAdm = student.admNo
        const data = await Student.findOne({ admNo: studAdm })
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


exports.createStudent = async (req, res) => {
    const newStudent = new Student(req.body)

    try {
            const savedStudent = await newStudent.save()
            res.status(200).json(savedStudent)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


// insert multiple students

exports.insertMultipeStudents = async (req, res) => {
    try {
        const tmp=await Student.find({admNo:{$in:req.body.studentsData.admNos}})
        if(tmp.length){
            return res.status(409).json("Duplicate admission number insertion!")
        }
        const savedStudents = await Student.insertMany(req.body.studentsData.excelData);
        res.status(200).json(savedStudents)
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}



//get student by admission no 

exports.getStudentByAdmNo = async (req, res) => {
    try {
        const student = await Student.findOne({ admNo: Number(req.params.admNo) })
        res.status(200).json(student)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

//get student by id

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        res.status(200).json(student)
    }
    catch (err) {
        res.status(500).json(err)
    }
}



//get student by admission no or name or class

exports.searchStudents = async (req, res) => {
    try {
        const searchname = RegExp(req.query.name, "i")
        const searchclass = RegExp(req.query.class, "i")
        const admNo = req.query.admNo
        var students
        if (req.query.name != '') students = await Student.find({ name: searchname }).sort({name:1})
        else if (req.query.class != '') students = await Student.find({ $and: [{ class: searchclass }, { tc: "No" }] }).sort({name:1})
        else students = await Student.find({ admNo: admNo })

        res.status(200).json(students)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


// update a student by id

exports.updateStudentById = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedStudent)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


//delete a student by id

exports.deleteStudentById = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id)
        res.status(200).json("Student Deleted")
    }
    catch (err) {
        res.status(500).json(err)
    }
}



// get current students

exports.getCurrentStudents = async (req, res) => {
    try {
        const students = await Student.find({ tc: "No" }).sort({ "class": 1, rollNo:1 })
        res.status(200).json(students)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


// get students by class

exports.getStudentsByClass = async (req, res) => {
    try {
        const students = await Student.find({ class: req.params.cls })
        res.status(200).json(students)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


exports.updateClassandRollNo = async (req, res) => {
    const failedStudents = req.body.failed.split(" ")
    const classIndexes = { "Nursery": 0, "LKG": 1, "UKG": 2, "1st": 3, "2nd": 4, "3rd": 5, "4th": 6, "5th": 7, "6th": 8, "7th": 9, "8th": 10, "9th": 11, "10th": 12, "11th":13, "12th":14 }
    const classes = ["Nursery", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"]
    const roll = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    try {
        const students = await Student.find({ tc: "No" }).sort({ gender: 1 });
        const updatedRes = students.map(async (student) => {
            const cls = student.class
            const nxtCls = classes[classIndexes[cls] + 1];
            const studentID = student._id;
            if (!failedStudents.includes(student.admNo)) student.class = nxtCls
            student.rollNo = roll[classIndexes[student.class]]
            roll[classIndexes[student.class]] += 1
            await Student.findByIdAndUpdate(studentID, {
                $set: student
            }, { new: true })
        })

        await Promise.all(updatedRes)
        
        res.status(200).json("Updated..")
    }
    catch (err) {
        res.status(500).json(err)
    }

}


exports.countStudents = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments()
        const currStudents = await Student.countDocuments({ tc: "No" })
        const result = await Student.aggregate([
            {
                $match: {
                    tc: "No"
                }
            },
            {
                $unwind: "$class" // Unwind the "class" array to get a separate document for each class entry
            },
            {
                $group: {
                    _id: "$class", // Group by the "class" field
                    count: { $sum: 1 } // Count the number of students in each class and store it in the "count" field
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the default "_id" field from the output
                    class: "$_id", // Rename the "_id" field to "class"
                    count: 1 // Include the "count" field in the output
                }
            }
        ])
        const classIndexes = { "Nursery": 0, "LKG": 1, "UKG": 2, "1st": 3, "2nd": 4, "3rd": 5, "4th": 6, "5th": 7, "6th": 8, "7th": 9, "8th": 10, "9th": 11, "10th": 12, "11th": 13, "12th": 14 }
        const count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        result.map((i) => {
            count[classIndexes[i.class]] = i.count
        })
        res.status(200).json({ totalStudents, currStudents, count })
    }
    catch (err) {
        res.status(500).json(err)
    }
}