const {db} = require('./db')
const commentService = {};

commentService.read = (comment_id) => {
    const sql = `
    SELECT * FROM comment WHERE id=$[comment_id];
    `;

    return db.one(sql, { comment_id }); 
    
};

commentService.create = (author, post_id, title, body) => {
    const sql = `
    INSERT INTO comment (author, post_id, title, body) 
    VALUES ($[author], $[post_id], $[title], $[body]);
    `;
    
    return db.none(sql, { author, post_id, title, body });
};

commentService.update = (author, post_id, title, body, comment_id ) => {
    const sql = 'UPDATE comment SET author=${author}, post_id=${post_id}, title=${title}, body=${body} WHERE id=${comment_id};';
    
    return db.none(sql, { author, post_id, title, body, comment_id });
};

commentService.delete = (comment_id) => {
    const sql = 'DELETE FROM comment WHERE id=${comment_id}';
    
    return db.none(sql, { comment_id });
};

module.exports = commentService;