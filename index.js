const express = require('express');
// const router = require('./Routers/router');


// Initiate express
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Home page routes
// app.get('/', (req,res)=> res.render('index'));

// Middleware for posts
app.use('/posts', require('./Routers/router'));
















const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Now listening on port, ${PORT}`));