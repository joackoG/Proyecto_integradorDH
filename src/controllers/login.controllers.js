const path = require('path');

const controllers = {
  login: (req, res) => {
    res.render(path.join(__dirname, '../', 'views', 'login.ejs'))
  }
}
module.exports = controllers