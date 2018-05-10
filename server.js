const express = require('express'); // import express library installed via NPM
const app = express(); // instantiate express 
const bodyParser = require('body-parser'); // import body-parser extension
const environment = process.env.NODE_ENV || 'development'; // setting up node environment
const configuration = require('./knexfile')[environment]; // running knexfile on the set-up environment
const database = require('knex')(configuration); // import configuration in knex

app.set('port', process.env.PORT || 3000); // set up port variable and run on 3000 by default
app.locals.title = 'Palette Picker'; // add title to 

app.use(bodyParser.json()); // use bodyParser extension in json format
app.use(express.static('public')); // set up static directory

app.get('/api/v1/palettes', (request, response) => { // calling GET method to this endpoint
  database('palettes').select() // select this table from database
  .then(palette => { // returning solved promise 
    response.status(200).json(palette); // returning a response with a status code of successful request, with an array of objects in JSON format     
  })
  .catch(error => { // catching error
    response.status(404).json(error); // return a response with a status code of server error, with an error
  });
});

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select() // select this table from database with specified id
  .then(palette => { // returning solved promise 
    response.status(200).json(palette[0]); // returning a response with a status code of successful request with found data
  })
  .catch(error => { // catching error
    response.status(404).json(error); // return a response with a status code of status not found with an error
  });
})

app.get('/api/v1/projects', (request, response) => { // calling GET method to this endpoint
  database('projects').select() // select this table from database
  .then(projects => { // returning solved promise 
    response.status(200).json(projects); // returning a response with a status code of successful request, with an array of objects in JSON format          
  })
  .catch(error => { // catching error
    response.status(404).json(error); // return a response with a status code of server error, with an error
  });
});

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select() // select this table from database with specified id
  .then(project => { // returning solved promise 
    response.status(200).json(project[0]); // returning a response with a status code of successful request with found data
  })
  .catch(error => { // catching error
    response.status(404).json(error); // return a response with a status code of status not found with an error
  });
})

app.post('/api/v1/palettes', (request, response) => { // calling POST method to this endpoint
  const palette = request.body; // request body object value

  if (!palette.palette_name) {
    return response.status(422).send({ error: 'Missing Data'}) // returning response object with status code and message that data is missing
  } else {
    database('palettes').insert(palette, 'id') // insert data with an id at this table

    .then(palette => { // returning solved promise 
    response.status(201).json({ id: palette[0] }) // returning a response with a status code of successful request, with a response object
  })
    .catch(error => { // catching error
    response.status(500).json(error); // return a response with a status code of server error, with an error
    });
  }; 
});

app.post('/api/v1/projects', (request, response) => { // calling GET method to this endpoint
  const project = request.body; // request body object value

  if (!project.project_name) {
    return response.status(422).send({ error: 'Missing Data'}) // returning response object with status code and message that data is missing
  } else {
    database('projects').insert(project, 'id') // insert data with an id at this table

    .then(project => { // returning solved promise 
    response.status(201).json({ project_id: project[0] }) // returning a response with a status code of successful request, with a response object
  })
    .catch(error => { // catching error
    response.status(500).json({ error }); // return a response with a status code of server error, with the error object
    }); 
  };
});

app.delete('/api/v1/palettes', (request, response) => { // calling DELETE method to this endpoint
  const id = request.body.id; // request body object value

  database('palettes').where('id', id).del()
  .then(palettes => { // returning solved promise 
    response.status(202).json('SUCCESS!');
  })
  .catch(error => { // catching error
    response.status(500).json({ error }); // returning a response with a status code of successful request, with the error object
  });
});

app.delete('/api/v1/projects', (request, response) => { // calling DELETE method to this endpoint
  const id = request.body.id; // request body object value

  database('projects').where('id', id).del()
  .then(projects => { // returning solved promise 
    response.status(202).json('SUCCESS!');
  })
  .catch(error => { // catching error
    response.status(500).json({ error }); // returning a response with a status code of successful request, with an error object
  });
});

app.listen(app.get('port'), () => { // connect app to listen at the port
  console.log('Palette Server listening');
});

module.exports = app; // exporting this server file as app