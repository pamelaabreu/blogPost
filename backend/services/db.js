// singleton pattern
let pgp = null;
let db = null;

if (!pgp) {
    pgp = require('pg-promise')({});  //require, and invoking with default empty object
    db = pgp('postgres://localhost/blog'); //invoking pgp with empty string
}


module.exports = {db}
