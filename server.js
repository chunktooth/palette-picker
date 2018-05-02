const express = require('express'); // import express library via NPM install
const app = express(); // instantiate express
const bodyParser = require('body-parser'); // import bodyparser module

app.set('port', process.env.PORT || 3000); // set port variable with default at 3000
app.locals.title = 'Palette Picker'; // 
app.locals.palettes  = [];
app.locals.projects = [];

app.use(bodyParser.json()); // use bodyParser in app
// app.use(bodyParser.urlencoded({ extended: true });
app.use(express.static('public')); // 

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (request, response) => {
  response.send('Palette Serverrr!')
});

app.get('/api/v1/palettes', (request, response) => {
  const palettes = app.locals.palettes;

  if (palettes) {
    response.status(200).json({ palettes });   
  } else {
    return response.status(404).json('Page Not Found');
  }
});

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;

  if(projects) {
    return response.status(200).json({ projects });
  } else {
    return response.status(404).json('Page Not Found');
  }
});

app.post('/api/v1/palettes', (request, response) => {
  const id = Date.now();
  const { palettes } = request.body;

  if(!palettes) {
    return response.status(422).send({ error: 'Well-formed request but containing semantic errors' });
  } else {
    app.locals.palettes.push({ id, palettes });
    return response.status(201).json({ id, palettes });
  }
});

app.post('/api/v1/projects', (request, response) => {
  const id = Date.now();
  const { projects } = request.body;

  if(!projects) {
    return response.status(422).send({ error: 'Well-formed request but containing semantic errors '});
  } else {
    app.locals.projects.push({ id, projects });
    return  repponse.status(201).json({ id, projects });
  }
});

// app.delete('api/v1/palettes:id', (request, response) => {
//  
// });

// app.delete('api/v1/projects:id', (request, response) => {
//  
// });

app.listen(app.get('port'), () => {
  console.log('Palette Server listening');
});