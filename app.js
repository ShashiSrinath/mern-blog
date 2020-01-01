const express = require('express');
require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('./middleware/cache');
const routes = require('./routes');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/blog';

const apiVersion = 'v1';



//clear redis cache
redis.flushCache();

const app = express();

// ----------------------------------------Middleware----------------------------------------------- //

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// ----------------------------------------Routes----------------------------------------------- //

// Auth Route
app.use(`/api/${apiVersion}/auth` , routes.auth);

// User Route
app.use(`/api/${apiVersion}/users` , routes.user);

// PostPage Route
app.use(`/api/${apiVersion}/posts`, routes.post);

// Category Route
app.use(`/api/${apiVersion}/categories`, routes.category);




// ----------------------------------------Start server----------------------------------------------- //

//database connection
mongoose.connect(DB_URI, {
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
