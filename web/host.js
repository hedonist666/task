#!/usr/bin/env node

const express = require('express')
const fs      = require('fs')
const http    = require('http')
const metrics = require('../build/Release/metrics')

const app = express()
const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('got /')
})

app.use('/', router)

const port   = process.env.PORT || 8888
const server = http.createServer(app)
server.on('error', onError)
server.listen(port)
console.log('[*] listening on port ' + port)


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
