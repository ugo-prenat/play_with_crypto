const connection = require('./connection')
const models = require('./models/export.models')

module.exports = {
    connect: connection.connect,
    models: {
        User: models.user
    }
}