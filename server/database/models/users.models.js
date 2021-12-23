const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    id: Number,
    username: String,
    mail: String,
    password: String,
    profilImg: String,
    showFirstConnectionMsg: Boolean,
    wallet: [
        {
            name: String,
            symbol: String,
            base: String,
            icon: String,
            cryptoAmount: Number,
        }
    ],
    activity: [
        {
            date: Date,
            list: [
                {
                    date: Date,
                    from: {
                        name: String,
                        symbol: String,
                        icon: String,
                        cryptoAmount: Number,
                        currencyAmount: Number,
                    },
                    to: {
                        name: String,
                        symbol: String,
                        icon: String,
                        cryptoAmount: Number,
                        currencyAmount: Number,
                    },
                }
            ]
        }
    ]
},{ timestamps: true })

module.exports = mongoose.model('user', userModel)