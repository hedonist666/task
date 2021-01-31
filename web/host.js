#!/usr/bin/env node

const express = require('express')
const fs      = require('fs')
const multer  = require('multer')
const metrics = require('../build/Release/metrics')
const morgan  = require('morgan')
const path    = require('path')

const RESPONSE_STATUS_SUCCESS = 200
const RESPONSE_STATUS_ERROR = 500

let upload = multer({ dest: path.join(__dirname, './csv/') })


const app = express()

app.use(morgan('combined'))

const router = express.Router()

let buffs = []
let indexes = []
fs.readdirSync(path.join(__dirname, 'answers')).forEach(file => {
    if (file.includes('.csv')) {
        buffs.push(new metrics.CSVBuff(path.join(__dirname, 'answers', file)))
        let last = buffs.length - 1
        indexes.push([buffs[last].size()].concat(Array.from(Array(buffs[last].size()).keys())))
    }
})


router.post('/upload', upload.single('payload'), (req, res, next) => {
    let idx = parseInt(req.body.idx)
    if (idx > buffs.length || idx < 0) {
        return res.status(RESPONSE_STATUS_ERROR).send({error: 'bad index'})
    }
    if (!req.file) {
        return res.status(RESPONSE_STATUS_ERROR).send({error: 'bad file'})
    }
    console.log('[*] file ok')
    try {
        let mae = metrics.mae(buffs[idx], req.file.path, indexes[idx])
        let rmape = metrics.rmape(buffs[idx], req.file.path, indexes[idx])
        res.status = RESPONSE_STATUS_SUCCESS
        return res.json({mae: mae, rmape: rmape})
    }
    catch (e){
        console.log(e)
        return res.status(RESPONSE_STATUS_ERROR).send({error: 'error checking input files'})
    }
})

app.use(express.static(path.join(__dirname, 'client/build')))

router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'client/build/index.html'));
})

app.use('/', router)


module.exports = app
