const config = require('./config')
const server = require('./service/server')
const app = require('./service/app');
server.start(app, config.server.port)