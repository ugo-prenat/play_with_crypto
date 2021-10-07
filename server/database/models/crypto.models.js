const mongoose = require('mongoose')

const CryptoModel = new mongoose.Schema({
    prices: []
},{ timestamps: true })

module.exports = mongoose.model('price', CryptoModel)