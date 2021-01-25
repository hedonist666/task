#!/usr/bin/env node

const express = require('express')
const fs      = require('fs')
const http    = require('http')
const multer  = require('multer')
const metrics = require('../build/Release/metrics')
const morgan  = require('morgan')
const path    = require('path')

let upload = multer({ dest: path.join(__dirname, './csv/') })


const app = express()

app.use(morgan('combined'))

const router = express.Router()

router.get('/', (req, res) => {
    console.log('TODO')
})


let buffs = []
let indexes = []
fs.readdirSync(path.join(__dirname, 'answers')).forEach(file => {
    if (file.indexOf('.csv') !== -1) {
        buffs.push(new metrics.CSVBuff(path.join(__dirname, 'answers', file)))
        let last = buffs.length - 1
        indexes.push([buffs[last].size()].concat(Array.from(Array(buffs[last].size()).keys())))
    }
})


router.post('/upload', upload.single('payload'), (req, res, next) => {
    req.body.idx = parseInt(req.body.idx)
    if (req.body.idx > buffs.length || req.body.idx < 0) {
        return res.status(500).send({error: 'bad index'})
    }
    if (req.file === undefined) {
        return res.status(500).send({error: 'bad file'})
    }
    try {
        let mae = metrics.mae(buffs[req.body.idx], req.file.path, indexes[req.body.idx])
        let rmape = metrics.rmape(buffs[req.body.idx], req.file.path, indexes[req.body.idx])
        res.status = 200
        return res.json({mae: mae, rmape: rmape})
    }
    catch (e){
        console.log(e)
        return res.status(500).send({error: 'error checking input files'})
    }
})

app.use('/', router)

module.exports = app
