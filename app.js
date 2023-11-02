const express = require('express');
const path = require('path')
const app = express();
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}
    http://localhost:${port}`);
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'views','login.html'))
   })
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'views','register.html'))
   })
app.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname,'views','productCart.html'))
   })
   app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname,'views','productDetail.html'))
   })