const express = require('express');
const commentRoutes = express.Router();
const commentService = require('../services/comment');


// ✅ GET /comment/:comment_id
commentRoutes.get('/:comment_id', (req, res) => {
    const { comment_id } = req.params;

    commentService.read(comment_id)
    .then(data => {
        res.json({ data });
    })
    .catch(err => {
        console.log('Error', err.toString());
        res.status(404).json({error: `Unable to find comment! Try again!`});
    })

});

// ❌ POST /comment
commentRoutes.post('/', (req, res) => {
    const { author, post_id, title, body } = req.body;

    commentService.create(author, post_id, title, body)
        .then(() => {
            res.json({success: `Created comment ${title}!`});
        })
        .catch(err => {
            console.log('Error', err.toString());
            res.status(404).json({error: `Unable to create comment! Try again!`});
        })
});

// ❌ PUT /comment/:comment_id
commentRoutes.put('/:comment_id', (req, res) => {
    const { author, post_id, title, body } = req.body;
    const { comment_id } = req.params;

    commentService.update(author, post_id, title, body, comment_id )
        .then(() => {
            res.json({success: `Update comment ${title}!`});
        })
        .catch(err => {
            console.log('Error', err.toString());
            res.status(404).json({error: `Unable to update comment! Try again!`});
        })
});

// ❌ DEL /comment/:comment_id

module.exports = commentRoutes;
