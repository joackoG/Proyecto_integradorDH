const express = require('express');
const { getUnpackedSettings } = require('http2');
const path = require('path')
const app = express();
const port = 3000
const indexRoutes = require('./routes/index.route.js')


// Config
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', indexRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}
    http://localhost:${port}`);
})






