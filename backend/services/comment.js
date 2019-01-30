const {db} = require('./db')
const commentService = {};

commentService.read = (comment_id) => {
    const sql = `
    SELECT * FROM comment WHERE id=$[comment_id];
    `;

    return db.one(sql, { comment_id }); 
    
};

module.exports = commentService;