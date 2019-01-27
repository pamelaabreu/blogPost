// NPM MODULES
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

// const { checkToken } = require('./middleware');
const userRoutes = require('./routes/user');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROUTES
app.use('/user', userRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));



