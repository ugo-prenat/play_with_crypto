const mongoose = require('mongoose')

const priceModel = new mongoose.Schema({
    prices: []
},{ timestamps: true })

module.exports = mongoose.model('price', priceModel)