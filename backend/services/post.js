const {db} = require('./db')
const postService = {};

postService.read = (post_id) => {
    const sql = `
    SELECT * FROM posts WHERE id=$[post_id];
    `;

    return db.one(sql, { post_id }); 

};

postService.readComments = (post_id, comment_id) => {
    const sql = `
    SELECT * FROM comment WHERE post_id=$[post_id];
    `;

    const sql2 = `
    SELECT * FROM comment WHERE post_id=$[post_id] AND id=$[comment_id];
    `;

    if(comment_id){
        return db.one(sql2, { user_id, comment_id });
    }

    return db.any(sql, { post_id }); 

};

postService.create = (author, title, body) => {
    const sql = `
    INSERT INTO posts (author, title, body) 
    VALUES ($[author], $[title], $[body]);
    `;
    
    return db.none(sql, { author, title, body });
};


module.exports = postService;
