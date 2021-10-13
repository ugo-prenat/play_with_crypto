const express = require('express')
const router = express.Router()
const db = require('../../database/export.database')
const Users = db.models.users

router.post('/sell', async (req, res) => {
    console.log('Trying to sell ;)');
})

module.exports = router