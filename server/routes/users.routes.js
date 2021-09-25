const express = require('express')
const db = require('../database/export')
const router = express.Router()
const userModel = db.models.user


module.exports = router