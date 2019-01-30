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

// ❌ PUT /comment/:comment_id
// ❌ DEL /comment/:comment_id

module.exports = commentRoutes;
