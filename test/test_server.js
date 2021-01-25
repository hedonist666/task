const path     = require('path')
const chai     = require('chai')
const chaiHttp = require('chai-http');
const app      = require('../web/host')
const should   = chai.should();

chai.use(chaiHttp)

describe('File uploading', function() {

    it('should return metrics with file', function() {
        chai.request(app)
            .post('/upload')
            .type('form')
            .field('idx', '0')
            .attach('payload', path.join(__dirname, 'materials/', 'download_468.1933.csv'))
            .end(function (err, res) {
                res.should.have.status(200); 
            })
    })

    it('should return 404 with no data', function() {
        chai.request(app)
            .post('/upload')
            .end(function (err, res) {
                res.should.have.status(500); 
            })
    })

})
