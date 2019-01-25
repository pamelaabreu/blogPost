const express = require('express');
const public_user = express.Router();
const userService = require('../services/user')

/*


❌ PUT /user/:user_id
❌ DEL /user/:user_id

*/

// ✅ POST /user
public_user.post('/', (req, res) => {
    const {username, email, password} = req.body;

    userService.create(username, email, password)
        .then(() => {
            res.json({success: 'Created User!'});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})

// ✅ GET /user/:user_id
public_user.get('/:user_id', (req, res) => {
    const {user_id} = req.params;

    userService.read(user_id)
        .then(data => {
            const {id, username, email} = data;
            res.json({id, username, email});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})

// ✅ GET /user/:user_id/posts
public_user.get('/:user_id/posts', (req, res) => {
    const {user_id} = req.params;

    userService.readPost(user_id)
        .then(data => {
            const {id, author, title, body} = data;
            res.json({id, author, title, body});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})


// ✅ GET /user/:user_id/posts/:post_id
public_user.get('/:user_id/posts/:post_id', (req, res) => {
    const {user_id, post_id} = req.params;

    userService.read(user_id)
        .then(data => {
            const {id, username, email} = data;
            res.json({id, username, email});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})

// ✅ GET /user/:user_id/comments
public_user.get('/:user_id/comments', (req, res) => {
    res.json({});
})

// ✅ GET /user/:user_id/comments/:comment_id
public_user.get('/:user_id/comments/:comment_id', (req, res) => {
    res.json({});
})

// ✅ POST /user/login
public_user.post('/login', (req, res) => {
    res.json({});
})


module.exports = public_user;