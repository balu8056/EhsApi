require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const poster = require('./routes/poster');
const material = require('./routes/material');
const category = require('./routes/category');
const subCategory = require('./routes/subCategory');
const auth = require('./routes/auth');

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/posters', poster);
app.use('/material', material);
app.use('/category', category);
app.use('/subCategory', subCategory);
app.use('/auth', auth);

app.get("/", (req, res)=>res.send("Helloo!!!"));

mongoose.connect('mongodb+srv://balu:mongopassword@cluster0.6ujrr.mongodb.net/example?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(res => {
    app.listen(process.env.PORT || 8080, ()=>console.log("Server started!!!"));
}).catch(err => {
    console.log(err);
});





