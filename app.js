const express = require('express');
require('dotenv');
const mongoose = require('mongoose');

const routes = require('./routes');
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/blog';

const apiVersion = 'v1';

require('dotenv').config();

const app = express();

// ----------------------------------------Middleware----------------------------------------------- //

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ----------------------------------------Routes----------------------------------------------- //

// Auth Route
app.use(`/api/${apiVersion}/auth` , routes.auth);

// Post Route
app.use(`/api/${apiVersion}/posts`, routes.post);

// User Route
app.use(`/api/${apiVersion}/users` , routes.user);


// ----------------------------------------Start server----------------------------------------------- //

//database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected successfully...!');
        app.listen(PORT , () => console.log(`server started at port:${PORT}`));
    })
    .catch(err => console.log(err));

module.exports = app;
