const chai = require('chai');
const should = chai.should();
const app = require('../server.js');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testing endpoints', () => {
  beforeEach(done => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done(k);
        });
      });
    });
  });

  describe('GET', () => {
    it('GET all projects', (done) => {
      chai.request(app)
      .get('/api/v1/projects')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array');
        response.body.length.should.equal(2);
        response.body[0].project.should.equal('Project1');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('project_name');
        response.body[0].should.have.property('created_at');
        response.body[0].should.have.property('updated_at');
      done();
      });
    });
  });

    it('GET all palettes', (done) => {
      chai.request(app)
        .get('/api/v1/palettes')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('array');
          response.body.length.should.equal(2);
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('project_id');
          response.body[0].should.have.property('palette_name');
          response.body[0].palette_name.should.equal('Ice-cream bar');
          response.body[0].should.have.property('project_id');
          response.body[0].project_id.should.equal(1);
          response.body[0].palette.should.deep.equal([ 
            '#B38938', '#A6C571', '#542912', '#818680', '#E871A9' ]);
          response.body[0].should.have.property('created_at');
        done(); 
      });
    });

    it('GET a project by a specified id', () => {
      chai.request(app)
        .get('/api/v1/projects/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
        done();
       });
    });

    it('GET a palette by a specified id', () => {
      chai.request(app)
        .get('/api/v1/palettes/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
      done();
      });
    });
  });

  describe('POST', () => {
    it('POST a new project', (done) => {
      chai.request(app)
        .post('/api/v1/projects')
        .send({
          project_name: 'Project2'
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(2);
      done();
      });
    });

    it('POST a new palette', (done) => {
      chai.request(app)
        .post('/api/v1/palettes')
        .send({
          id:1,
          palette_name: 'Ick Candies',
          color0: '#258006',
          color1: '#42F3E7',
          color2: '#448232',
          color3: '#0D0F4C',
          color4: '#B93CE8',
          project_id: project[0]
        })
        .end((error, response)) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(8);
      done();      
        });
    });

    it('should not POST to projects with missing data', (done) => {
      chai.request(app)
        .post('/api/v1/projects')
        .send({})
        .end((error, response) => {
          response.should.have.status(406);
          response.body.error.should.equal('Missing data')
        });
      done(); 
    }); 

    it('should not POST to palettes with missing data', (done) => {
      chai.request(app)
        .post('/api/v1/palettes')
        .send({})
        .end((error, response) => {
          response.should.have.status(406);
          response.body.error.should.equal('Missing data')
        });
      done(); 
     });
  });

  describe('DELETE', () => {
    it('DELETE a project with a specified id', (done) => {
      chai.request(app)
      .delete('/api/v1/projects/')
      .send({ id: 2 })
      .end((error, response) => {
        response.should.be.json;
        response.body.should.be.a('string');
      done();
    });

    it('DELETE a palette with a specified id', (done) => {
      chai.request(app)
      .delete('/api/v1/palettes/')
      .send({ id: 2 })
      .end((error, response) => {
        response.should.be.json;
        response.body.should.be.a('string');
      done();
    });
  });   
});