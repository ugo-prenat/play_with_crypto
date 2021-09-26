const express = require('express')
const app = express()
require('dotenv').config()

PORT = process.env.PORT

// Server initiation
app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`))
app.use(express.json())
app.use(express.text())
app.use(express.static('client'))

// DB connection
const db = require('./database/export')
db.connect
const userModel = db.models.user

// Routes import
const routes = require('./routes/export.routes')
app.use('/api/users/', routes.user)

// API tests
//const api = require('./api/export')

let toReturn
const rp = require('request-promise')
const API_KEY = process.env.API_KEY
const API_PATH = 'https://api.nomics.com/v1/currencies/ticker'

async function getBTCprice() {
    const url = `${API_PATH}?key=${API_KEY}&ids=BTC`

    rp({ url, json: true })    
    .then(response => console.log(response[0].price))
    .catch(err => console.log(err))

    setInterval(() => {
        rp({ url, json: true })    
        .then(response => console.log(response[0].price))
        .catch(err => console.log(err))
    }, 10500)
}

getBTCprice()