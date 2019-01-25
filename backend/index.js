// NPM MODULES
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

const {checkToken} = require('./middleware');
const publicRoutes = require('./routes/public');
const {privateRoutes} = require('./routes/private');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//ROUTES
app.use(publicRouter);
app.use(publicRoutes);
app.use(checkToken, privateRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));



