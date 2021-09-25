const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilImg: String,
}, {timestamps: true})

module.exports = {
    user: mongoose.model('user', userSchema),
}