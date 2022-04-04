const user = require("../db/models/user");

module.exports = function (app, models) {

  // auth.js controller
  const jwt = require('jsonwebtoken');

  function generateJWT(user) {
    const mpJWT = jwt.sign({ id: user.id }, "AUTH-SECRET", { expiresIn: 60 * 60 * 24 * 60 });

    return mpJWT
  }
  // render page
  app.get('/login', (req, res) => {
    res.render('login');
  })
  app.get('/sign-up', (req, res) => {
    res.render('sign-up');
  })


  // post form
  app.post('/login', (req, res) => {
    models.User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
        //make sure to name these accordingly
      }
    }).then(user => {
      const mpJWT = generateJWT(user)
      res.cookie("mpJWT", mpJWT)
      res.redirect('/')
    }).catch((err) => {
      console.log(err)
    });
  }) 

  app.post('/sign-up', (req, res) => {
    models.User.create(req.body).then(user => {
      const mpJWT = generateJWT(user)
      res.cookie("mpJWT", mpJWT)
      res.redirect('/')
    }).catch((err) => {
      console.log(err)
    });
  })
  // LOGOUT
  app.get('/logout', (req, res, next) => {
    res.clearCookie('mpJWT');

    // req.session.sessionFlash = { type: 'success', message: 'Successfully logged out!' }
    // comment the above line in once you have error messaging setup (step 15 below)
    return res.redirect('/');
  });
}
