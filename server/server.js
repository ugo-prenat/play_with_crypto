const express = require('express')
const app = express()

require('dotenv').config()
const Crypto = require('./database/export.database').models.crypto

API_PATH = 'https://api.coinbase.com/v2/prices'

const cors = require('cors')
app.use(cors())

PORT = process.env.PORT

// Server initiation
app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`))
app.use(express.json())
app.use(express.text())
app.use(express.static('client'))

// DB connection
const db = require('./database/export.database')
db.connect

// Routes import
const routes = require('./routes/export.routes')
app.use('/api/users/', routes.users)
app.use('/api/crypto/', routes.crypto)
app.use('/api/auth/', routes.auth)

// API prices loop
const pricesLoop = require('./api/pricesLoop')
Crypto.findById('6151823848fe492bdae20310').then(cryptoObject => pricesLoop(cryptoObject))
