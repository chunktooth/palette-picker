const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.get('/', (request, response) => {
  response.send('Palette Serverrr!')
});

// app.get('/api/v1/palettePicker', (request, response) => {
//   response.status(200).json();
// });

app.listen(app.get('port'), () => {
  console.log('Palette Server listening');
});