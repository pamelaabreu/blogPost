const {db} = require('./db')
const userService = {};

userService.create = (username, email, password) => {
    const sql = `
    INSERT INTO users (username, email, password) 
    VALUES ($[username], $[email], $[password]);
    `;
    
    return db.none(sql, { username, email, password });
};

userService.read = (user_id) => {
    const sql = `
    SELECT * FROM users WHERE id=$[user_id];
    `;

    return db.one(sql, { user_id }); 
    
};

userService.readPost = (user_id, post_id) => {
    if(post_id){
        return db.any('SELECT * FROM posts WHERE author=${user_id} AND id=${post_id}', { user_id, post_id }) 
    } 
    
    return db.any('SELECT * FROM posts WHERE author=${user_id}', { user_id }) 
    
};

userService.readComment = (user_id, comment_id) => {
    if(comment_id){
        return db.any('SELECT * FROM comment WHERE author=${user_id} AND id=${comment_id}', { user_id, comment_id }) 
    }

    return db.any('SELECT * FROM comment WHERE author=${user_id}', { user_id }) 

};

userService.update = (user_id, username, email, password) => {
    const sql = 'UPDATE users SET username=${username}, email=${email}, password=${password} WHERE id=${user_id}';

    return db.none(sql, { user_id, username, email, password })
};

userService.delete = (user_id) => {
    const sql = 'DELETE FROM users WHERE id=${user_id}';
    
    return db.none(sql, { user_id })
};

module.exports = userService;