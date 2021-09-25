const mongoose = require('mongoose')
require('dotenv').config()

DB_URI = process.env.DB_URI

async function connect() {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB'))
}

module.exports = {
    connect: connect()
}