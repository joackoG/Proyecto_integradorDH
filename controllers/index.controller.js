
const path = require('path')

const controllers = {
    index: (req, res) => {
        res.sendFile(path.join(__dirname, '../' ,'views', 'index.html'))
      },
    login: (req,res) => {
        res.sendFile(path.join(__dirname, '../' , 'views' , 'login.html'  ))
     },

     register:  (req, res) => {
      res.sendFile(path.join(__dirname, '../' , 'views' , 'register.html'  ))
      },
      productDetail:  (req, res) => {
        res.sendFile(path.join(__dirname, '../' , 'views' , 'productDetail.html'  ))
        },
    productCart: (req, res )=>{
      res.sendFile(path.join(__dirname,'../' , 'views' , 'productCart.html'))
    }
    // infoParams: (req, res) => {
    //   const params = req.params.id
    //   res.send('Estas consultando la info de ' + params)
    // }
}
module.exports = controllers

// productsRoutes
// usersRoutes
// mainRoutes
// producsControllers
// usersControllers
// mainControllers