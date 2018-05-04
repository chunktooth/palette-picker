const chai = require('chai');
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Testing endpoints', () => {
  it('GET all the palettes', (done) => {
    chai.request(server)
      .get('/api/v1/penguins')
      .end((err, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body.length.should.equal(2);
        done();
      })
  })
})