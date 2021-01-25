const metrics = require('../build/Release/metrics')
const path    = require('path')
const chai    = require('chai')

const should  = chai.should()

describe('metrics', function() {
    let buff1, buff2
    before(function() {
        buff1 = new metrics.CSVBuff(path.join(__dirname, 'materials/answers_shifted1.1.csv'));
        buff2 = new metrics.CSVBuff(path.join(__dirname, 'materials/download_468.1933.csv'));
    })

    it('Mae value should not be zero with diffrent contents', function() {
        metrics.mae(buff1, buff2, path.join(__dirname, 'materials/index.txt')).should.not.equal(0)
    })

    it('Rmape value should not be zero with diffrent contents', function() {
        metrics.rmape(buff1, buff2, path.join(__dirname, 'materials/index.txt')).should.not.equal(0)
    })

    it('Mae should throw with bad files', function() {
        (function() {
            metrics.mae('bad.csv', buff2, path.join(__dirname, 'materials/index.txt'))
        }.should.throw());

        (function() {
            metrics.mae(buff1, buff2, path.join(__dirname, 'materials/bad.txt'))
        }.should.throw());
    })

    it('Rmape should throw with bad files', function() {
        (function() {
            metrics.rmape('bad.csv', buff2, path.join(__dirname, 'materials/index.txt'))
        }.should.throw());

        (function() {
            metrics.rmape(buff1, buff2, path.join(__dirname, 'materials/bad.txt'))
        }.should.throw());
    })
})
