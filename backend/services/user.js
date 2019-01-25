const {db} = require('./db')
const userService = {};

userService.create = (username, email, password) => {
    const command = 'INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password});';
    
    return db.none(command, {username, email, password});
    // .none is for no return of records
};

userService.read = (id) => {
    return db.one('SELECT * FROM users WHERE id=${id}', {id}) 
    // PG promise, sql injections: one way to hack the system,
    // SQL query, .one returns promises, returns data as an object because we're accessing only one because id is unique... sending just one
    // return database.any(`SELECT * FROM users WHERE id=${id}`) //SQL query, .any returns promises, returns data as an array of objects because any is any number of data, give me any number of rows
};

userService.update = (id, name, email) => {
    const command = 'UPDATE users SET name=${name}, email=${email} WHERE id=${id}';
    return db.none(command, {id, name, email})
};

userService.delete = (id) => {
    const command = 'DELETE FROM pets WHERE owner=${id}; DELETE FROM users WHERE id=${id}';
    return db.none(command, {id})
};

module.exports = userService;