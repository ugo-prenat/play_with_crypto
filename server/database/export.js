const connection = require('./connection')
const models = require('./models/export.models')

module.exports = {
    connect: connection.connect,
    models: {
        users: models.users
    }
}