// Require Libraries
const fetch = import('node-fetch');
const express = require('express');
const methodOverride = require('method-override')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');

//db
const { Sequelize } = require('sequelize')
// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://acopanocuxzcep:0bcefdc727ace2cdfae6468080d7d0c00d7c767de6809809e1a058f723d6f4b8@ec2-52-3-60-53.compute-1.amazonaws.com:5432/dl4ktqku4kfva') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('events-tutorial', '1', '1', {
//   host: 'localhost',
//   dialect: 'postgres'
// });
// App Setup
const app = express();

// Middleware
const { engine } = require('express-handlebars');

app.engine('handlebars', engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const models = require('./db/models');

sequelize.authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   console.error('Unable to connect to the database:', err);
 });


require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000')
})