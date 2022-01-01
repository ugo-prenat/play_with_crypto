const users = require('./users.routes')
const issue = require('./issue.routes')
const crypto = require('./crypto.routes')
const auth = require('./authentication.routes')

module.exports = {
    users,
    crypto,
    auth,
    issue
}