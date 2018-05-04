const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(bodyParser.json()); 
app.use(express.static('public'));

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
  .then(palettes => {
    response.status(200).json(palettes);      
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
  .then(projects => {
    response.status(200).json(projects);      
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/palettes/', (request, response) => {
  const palette = request.body;

  database('palettes').insert(palette, 'id')
  .then(palette => {
    response.status(201).json({ id: palette[0] })
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/projects/', (request, response) => {
  const project = request.body;

  database('projects').insert(project, 'id')

  .then(project => {
    response.status(201).json({ id: project[0] })
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.delete('/api/v1/palettes/', (request, response) => {
  const id = request.body.id;

  database('palettes').where('id', id).del()
  .then(palette => {
    response.status(202).json('SUCCESS!');
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});


app.listen(app.get('port'), () => {
  console.log('Palette Server listening');
});

module.exports = app;