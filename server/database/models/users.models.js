const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    id: Number,
    username: String,
    mail: String,
    password: String,
    profilImg: String,
    wallet: [
        {
            name: String,
            symbol: String,
            base: String,
            icon: String,
            cryptoAmount: Number,
            currencyAmount: Number
        }
    ],
    activity: [
        {
            date: Date,
            type: String, // Deposit or withdraw
            cryptoAmount: Number,
            cryptoBase: String
        }
    ]
},{ timestamps: true })

module.exports = mongoose.model('user', userModel)