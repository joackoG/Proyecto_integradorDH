
function userLoggedMiddleware(req, res, next) {
  if (!req.session.usuario.admin) {
    return res.redirect('/'); 
  }
  next()
 


}

module.exports = userLoggedMiddleware;