const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/mainRoutes');

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRoutes)
app.use('/login', mainRoutes)
app.use('/register', mainRoutes)
app.use('/productCart', mainRoutes)
app.use('/productDetail', mainRoutes)





app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}
    http://localhost:${port}`);
})



