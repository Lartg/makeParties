// Require Libraries
const fetch = import('node-fetch');
const express = require('express');


// App Setup
const app = express();

// Middleware
const { engine } = require('express-handlebars');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000')
})