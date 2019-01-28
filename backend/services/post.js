const {db} = require('./db')
const postService = {};

postService.read = (post_id) => {
    const sql = `
    SELECT * FROM posts WHERE id=$[post_id];
    `;

    return db.one(sql, { post_id }); 

};

postService.readComments = (post_id) => {
    const sql = `
    SELECT * FROM comment WHERE post_id=$[post_id];
    `;

    return db.any(sql, { post_id }); 

};


module.exports = postService;
