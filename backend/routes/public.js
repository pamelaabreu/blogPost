const express = require('express');
const publicRoutes = express.Router();

const public_user = require('./public_user');
const public_post = require('./public_post');
const public_comment = require('./public_comment');

publicRoutes.use('/user', public_user);
publicRoutes.use('/post', public_post);
publicRoutes.use('/comment', public_comment);

module.exports = publicRoutes;

