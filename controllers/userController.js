const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')



exports.getUserByToken = async (req, res) => {
    const { token } = req.body
    try {
        const user = jwt.verify(token, process.env.JWT_SEC)
        const username = user.username
        const data = await User.findOne({ username: username })
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.createUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        type: req.body.type
    })

    try {
        const oldUsername = await User.findOne({ username: req.body.username })
        if (oldUsername) {
            res.status(400).json("Username already exists!!")
        }
        else {
            const savedUser = await newUser.save()
            res.status(200).json(savedUser)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}


exports.changeUserType = async (req, res) => {
    try {
        const encrypted = { ...req.body, password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString() }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: encrypted
        }, { new: true })
        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        const usersWithDecryptedPasswords = [];
        for (const user of users) {
            const decPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
            const { password, ...others } = user._doc
            usersWithDecryptedPasswords.push({ ...others, password: decPass })
        }
        res.status(200).json(usersWithDecryptedPasswords)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted")
    }
    catch (err) {
        res.status(500).json(err)
    }
}