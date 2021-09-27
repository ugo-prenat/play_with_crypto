const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilImg: String,
    wallet: {
        balance: {
            amount: Number,
            currency: {
                name: String,
                symbol: String
            }
        },
        crypto: [
            {
                name: String,
                symbol: String,
                totalBalance: Number
            }
        ]
    }
},{ timestamps: true })

module.exports = mongoose.model('user', userModel)