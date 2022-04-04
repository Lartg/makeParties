const user = require("../db/models/user");

module.exports = function (app, models) {

  // render page
  app.get('/login', (req, res) => {
      res.render('login');
    })
  app.get('/sign-up', (req, res) => {
      res.render('sign-up');
    })
  

  // post form
  app.post('/login', (req, res) => {
    models.User.findAll({
      where: {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password
        //make sure to name these accordingly
      }
    }).then(user => {
      console.log(user)
    }).catch((err) => {
      console.log(err)
    });
  }) 

  app.post('/sign-up', (req, res) => {
    models.User.create(req.body).then(user => {
      console.log(user)
    }).catch((err) => {
      console.log(err)
    });
  }) 
}