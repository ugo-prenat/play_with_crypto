const mongoose = require('mongoose')

const LogsModel = new mongoose.Schema([
    {
        mail: String,
        username: String,
        password: String
    }
],
{ timestamps: true })

module.exports = mongoose.model('logs', LogsModel)