const configuration = require("../knexfile")
const knex = require("knex")

module.exports = knex(configuration[process.env.NODE_ENV || "development"])
