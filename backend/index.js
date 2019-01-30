// NPM MODULES
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

// const { checkToken } = require('./middleware');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROUTES
app.get('/ping', (req, res) => {
    res.json({'pong':true})
})

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));



