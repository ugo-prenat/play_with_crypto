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
            from: {
                name: String,
                symbol: String,
                icon: String,
                cryptoAmount: String,
                currencyAmount: String,
            },
            to: {
                name: String,
                symbol: String,
                icon: String,
                cryptoAmount: String,
                currencyAmount: String,
            },
        }
    ]
},{ timestamps: true })

module.exports = mongoose.model('user', userModel)