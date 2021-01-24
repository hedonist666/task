#!/usr/bin/env node

const assert  = require('assert')
const metrics = require('../build/Release/metrics')
const path    = require('path')

suite('metrics', function() {
    let buff1, buff2
    setup(function() {
        buff1 = new metrics.CSVBuff(path.join(__dirname, '../web/answers/answers_shifted1.1.csv'));
        buff2 = new metrics.CSVBuff(path.join(__dirname, 'materials/download_468.1933.csv'));
    })

    suite('mae', function() {
        test('Value should not be zero with diffrent contents', function() {
            let res = metrics.mae(buff1, buff2, path.join(__dirname, 'materials/index.txt'));
            assert.notEqual(res, 0)
        })
    })
    suite('rmape', function() {
        test('Value should not be zero with diffrent contents', function() {
            let res = metrics.rmape(buff1, buff2, path.join(__dirname, 'materials/index.txt'));
            assert.notEqual(res, 0)
        })
    })
})
