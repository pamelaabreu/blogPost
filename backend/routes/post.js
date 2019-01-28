const express = require('express');
const postRoutes = express.Router();
const postService = require('../services/post');

// PUBLIC POST ROUTES
// ✅ GET /post/:post_id
postRoutes.get('/:post_id', (req, res) => {
    const { post_id } = req.params;

    postService.read(post_id)
        .then(data => {
            res.json({ data });
        })
        .catch(err => {
            console.log('Error', err.toString());
            res.status(404).json({error: `Unable to find user! Try again!`});
        })
});

// ✅ GET /post/:post_id/comments
postRoutes.get('/:post_id/comments', (req, res) => {
    const { post_id } = req.params;

    postService.readComments(post_id)
        .then(data => {
            res.json({ data });
        })
        .catch(err => {
            console.log('Error', err.toString());
            res.status(404).json({error: `Unable to find user! Try again!`});
        })
});

// ✅ GET /post/:post_id/comments/:comment_id

// PRIVATE POST ROUTES
// ❌ POST /post
// ❌ PUT /post/:post_id
// ❌ DEL /post/:post_id

module.exports = postRoutes;