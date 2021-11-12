const users = require('./users.routes')
const crypto = require('./crypto.routes')
const auth = require('./authentication.routes')

module.exports = {
    users,
    crypto,
    auth
}