const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const userRouter = require('./users/userRouter.js');
const protected = require('./users/protected-middleware.js');
const knexConfig = require('./data/dbConfig.js')

const server = express();

const sessionConfig = {
    name: 'flippyflappy', 
    secret: 'no one can know',
    cookie: {
        maxAge: 1000 * 30,
        secure: false, //true in production
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true, // GDPR laws against setting cookies automatically
    store: new KnexSessionStore({
        knex: knexConfig,
        createtable: true,
        clreaInterval: 1000 * 60 * 30,
    })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use('/api/', userRouter);
server.use('/api/restricted', protected, userRouter);

module.exports = server;