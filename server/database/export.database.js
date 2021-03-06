const connection = require('./connection')
const models = require('./models/export.models')

module.exports = {
    connect: connection.connect,
    models: {
        users: models.users,
        crypto: models.crypto,
        logs: models.logs,
    }
}