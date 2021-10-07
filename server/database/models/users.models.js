const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    profilImg: String,
    wallet: {
        amount: Number,
        currency: {
            name: String,
            symbol: String
        },
        cryptoList: [
            {
                name: String,
                symbol: String,
                icon: String,
                totalAmount: Number
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
    }
},{ timestamps: true })

module.exports = mongoose.model('user', userModel)