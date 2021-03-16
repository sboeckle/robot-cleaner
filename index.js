const config = require('./config');

const db = require('./db');
const sequelize = db.getConnection(config.db);
sequelize.sync();

const app = require('./app/express');
const server = require('./app/server');

server.start(app, config.server.port);