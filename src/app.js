// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

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

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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
