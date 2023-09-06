const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    },
    { timestamps: true, expireAfterSeconds: 2600000 }
);

module.exports = mongoose.model('Notice', noticeSchema);