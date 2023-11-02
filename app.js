const express = require('express');
const path = require('path')
const app = express();
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'home.html'))
})

app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}
    http://localhost:${port}`);
})