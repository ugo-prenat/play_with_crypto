const rp = require('request-promise')
require('dotenv').config()
const API_KEY = process.env.API_KEY

async function request(url) {

    url += '?key=' + API_KEY

    const requestOptions = {
        url,
        json: true
    }

    rp(requestOptions)
    .then(response => console.log(response))
    .catch(err => console.log(err))
}

module.exports = request()