#!/usr/bin/env node

const express = require('express')
const fs      = require('fs')
const http    = require('http')
const multer  = require('multer')
const metrics = require('../build/Release/metrics')

let upload = multer({ dest: './csv/' })

const app = express()
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

//console.log(metrics.mae('csv/answers_shifted1.1.csv', 'csv/download_468.1933.csv'))

module.exports = app
