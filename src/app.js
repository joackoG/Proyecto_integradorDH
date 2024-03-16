

// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
<<<<<<< HEAD
const port = 3001;
const session = require('express-session');
=======
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const logs = require('./middlewares/logs');
const session = require('express-session')
const rememberme = require('./middlewares/rememberme')

// ************ express() - (don't touch) ************
const app = express();


const port = 3002;
>>>>>>> eb3abd9340e676eea8aaefe5a53409b155d8837e


const methodOverride =  require('method-override'); 


const app = express();
app.use(methodOverride('_method'));

// 
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Configura el middleware de parseo para datos de formularios
app.use(express.urlencoded({ extended: true }));
// app.set('view options', { debug: true }); 
app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true,
}));
=======
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

>>>>>>> eb3abd9340e676eea8aaefe5a53409b155d8837e

const mainRoutes = require('./routes/mainRoutes.js');
const usersRoutes = require('./routes/users.routes.js');
const productsRoutes = require('./routes/products.routes.js');

// rutas
app.use('/', mainRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));


app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true,
}));
// ************ error handler ************
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.path = req.path;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// Agrega un manejador de errores al final de tu archivo de configuración de Express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});


app.listen(port, ()=>{
  console.log(`servidor corriendo en http://localhost:${port}`);
})
module.exports = app;
