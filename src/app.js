// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const port = 3001;
const session = require('express-session');
const methodOverride =  require('method-override'); 
const app = express();
const logs = require('./middlewares/logs');
const recuerdame = require('./middlewares/authMiddleware/recuerdame.js');





app.use(methodOverride('_method'));
// Configura el middleware de parseo para datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'mi_secreto',
  resave: false,
  saveUninitialized: true,
}));
app.use(recuerdame);

app.use(logs)// hacer seguimiento del usuario por nuestra aplicacion
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
// app.use((req, res, next) => next(createError(404)));

// Agrega un manejador de errores al final de tu archivo de configuración de Express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});


app.listen(port, ()=>{
  console.log(`servidor corriendo en http://localhost:${port}`);
})
module.exports = app;
