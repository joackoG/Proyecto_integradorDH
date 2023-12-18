const express = require('express')
const path = require('path')

const mainRoutes = require('./routes/main.routes.js')
const loginRoutes = require('./routes/login.routes.js')
const app = express();
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', mainRoutes)
app.use('/login', loginRoutes)





app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}
    http://localhost:${port}`);
})


app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
})
app.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'productCart.html'))
})
app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'productDetail.html'))
})

