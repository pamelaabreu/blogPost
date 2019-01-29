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
            res.status(404).json({error: `Unable to find post! Try again!`});
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
            res.status(404).json({error: `Unable to find post comments! Try again!`});
        })
});

// ✅ GET /post/:post_id/comments/:comment_id
postRoutes.get('/:post_id/comments/:comment_id', (req, res) => {
    const { post_id, comment_id } = req.params;

    postService.readComments(post_id, comment_id)
        .then(data => {
            res.json({ data });
        })
        .catch(err => {
            console.log('Error', err.toString());
            res.status(404).json({error: `Unable to find post comments! Try again!`});
        })
});

// PRIVATE POST ROUTES
// ❌ POST /post
postRoutes.post('/', (req, res) => {
    const { author, title, body } = req.body;

    postService.create(author, title, body)
    .then(() => {
        res.json({success: `Created ${title} by ${author}.`});
    })
    .catch(err => {
        console.log('Error', err.toString());
        res.status(404).json({error: `Unable to create ${title}! Try again!`});
    })
});

// ❌ PUT /post/:post_id
postRoutes.put('/:post_id', (req, res) => {
    const { post_id }  = req.params;
    const { author, title, body } = req.body;

    postService.update(post_id, author, title, body)
    .then(() => {
        res.json({success: `Updated ${title} by ${author}!`});
    })
    .catch(err => {
        console.log('Error', err.toString());
        res.status(404).json({error: `Unable to update ${title}! Try again!`});
    })

});

// ❌ DEL /post/:post_id
postRoutes.delete('/:post_id', (req, res) => {
    const { post_id }  = req.params;

    postService.delete(post_id)
    .then(() => {
        res.json({success: `Deleted post with ID:${post_id}!`});
    })
    .catch(err => {
        console.log('Error', err.toString());
        res.status(404).json({error: `Unable to delete post with ID:${post_id}! Try again!`});
    })
});

module.exports = postRoutes;