const Student = require('../models/Students')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const CryptoJS = require('crypto-js')


exports.studentLogin = async (req, res) => {
    try {
        const student = await Student.findOne({ admNo: req.body.admNo })
        if (!student) {
            res.status(401).json("Wrong Admission Number!")
        }
        else {
            const dob = student.dob
            if (dob !== req.body.dob) {
                return res.status(401).json("Wrong DOB!")
            }

            const accessToken = jwt.sign(
                {
                    admNo: student.admNo
                },
                process.env.JWT_SEC,
                { expiresIn: "3d" }
            )
            dob === req.body.dob && res.status(200).json({ ...student._doc, accessToken })
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}



exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(401).json("Wrong Credentials!")
        }
        else {
            const decryptedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
            if (decryptedPass !== req.body.password) {
                return res.status(401).json("Wrong Password!")
            }

            const accessToken = jwt.sign(
                {
                    username: user.username
                },
                process.env.JWT_SEC,
                { expiresIn: "3d" }
            )

            const { password, ...others } = user._doc;
            decryptedPass === req.body.password && res.status(200).json({ ...others, accessToken })
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}