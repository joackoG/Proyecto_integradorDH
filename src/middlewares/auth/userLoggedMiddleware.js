const db = require('../../database/models');

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false
  let emailInCookie=null

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true
    res.locals.userLogged = req.session.userLogged
    if (req.session.userLogged.admin == 1) {
      res.locals.userAdmin = true;
    }
  }
  if(req.cookies?.userEmail){
    emailInCookie = req.cookies.userEmail 
    db.Usuario.findAll().then((users) => {
      let userFromCookie = users.find((i) => i.correo == emailInCookie)
      if (userFromCookie) {
        req.session.userLogged = userFromCookie
      }
  
      if (req.session?.userLogged) {
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
      }
      
    })
  }
  next()
 
  /* DataBase */

}

module.exports = userLoggedMiddleware;
