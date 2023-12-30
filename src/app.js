const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/mainRoutes');
const usersRoute = require('./routes/users.routes');
const productsRoute = require('./routes/products.routes');


const app = express();
const port = 3001;
// config
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// rutas
app.use('/', mainRoutes)
app.use('/login', usersRoute)
app.use('/register', usersRoute);
app.use('/productCart', productsRoute)
app.use('/producrDetail', productsRoute)


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}
    http://localhost:${port}`);
})


// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'register.ejs'))
// })
// app.get('/productCart', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'productCart.ejs'))
// })
// app.get('/productDetail', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'productDetail.ejs'))
// })

module.exports = app;