#!/usr/bin/env node

const express = require('express')
const fs      = require('fs')
const http    = require('http')
const multer  = require('multer')
const metrics = require('../build/Release/metrics')
const morgan  = require('morgan')

let upload = multer({ dest: './csv/' })

const app = express()

app.use(morgan('combined'))

const router = express.Router()

router.get('/', (req, res) => {
    console.log('TODO')
})


router.post('/upload', upload.single('payload'), (req, res) => {
    res.body = {
        mae: metrics.mae('answers/answers_shifted1.1csv', req.file),
        rmape: metrics.rmape('answers/answers_shifted1.1csv', req.file)
    }
})

app.use('/', router)

module.exports = app
