const mongoose = require('mongoose')

const LogsModel = new mongoose.Schema({
    logs: [
        {
            email: String,
            password: String
        }
    ] 
},
{ timestamps: true })

module.exports = mongoose.model('logs', LogsModel)