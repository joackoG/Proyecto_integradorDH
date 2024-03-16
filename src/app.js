// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const logs = require('./middlewares/logs');
const session = require('express-session')
const rememberme = require('./middlewares/rememberme')

// ************ express() - (don't touch) ************
const app = express();


const port = 3002;

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(logs) //Hacer un seguimiento del usuario por nuestra aplicación
app.use(session({ secret: "No hay plata", resave: true, saveUninitialized: false }))
app.use(rememberme)

// ************ Route System require and use() ************

const mainRoutes = require('./routes/mainRoutes');
const productsRouter = require('./routes/productsRoutes');
const usersRouter = require('./routes/usersRoutes'); // Rutas /products

app.use('/', mainRoutes)
app.use('/users', usersRouter);
app.use('/productCart', mainRoutes)
app.use('/products', productsRouter);




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

// ************ exports app - dont'touch ************
module.exports = app;
