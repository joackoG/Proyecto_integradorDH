const path = require('path');

const controllers = {
    home: (req, res) => {
        res.render(path.join(__dirname, '../' ,'views', 'index.ejs'))
      }
    }
    module.exports = controllers