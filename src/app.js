// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const port = 3001;



const methodOverride =  require('method-override'); 


const app = express();
app.use(methodOverride('_method'));

// 
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Configura el middleware de parseo para datos de formularios
app.use(express.urlencoded({ extended: true }));
// app.set('view options', { debug: true }); 


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
