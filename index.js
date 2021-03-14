const config = require('./config');

const db = require('./service/db');
const sequelize = db.connect(config.db);
sequelize.sync();

const app = require('./service/app');
const server = require('./service/server');

server.start(app, config.server.port)