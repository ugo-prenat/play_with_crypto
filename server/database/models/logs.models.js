const mongoose = require('mongoose')

const logsModel = new mongoose.Schema({
    id: Number,
    username: String,
    mail: String,
    password: String,
},{ timestamps: true })

module.exports = mongoose.model('logs', logsModel)