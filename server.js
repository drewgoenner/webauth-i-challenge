const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/', userRouter);

module.exports = server;