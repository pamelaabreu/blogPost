const express = require('express');
const userRoutes = express.Router();
const userService = require('../services/user');

//PUBLIC USER ROUTES

// ✅ POST /user
userRoutes.post('/', (req, res) => {
    const {username, email, password} = req.body;

    userService.create(username, email, password)
        .then(() => {
            res.json({success: 'Created User!'});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})

// ✅ GET /user/:user_id
userRoutes.get('/:user_id', (req, res) => {
    const {user_id} = req.params;

    userService.read(user_id)
        .then(data => {
            const {id, username, email} = data;
            res.json({id, username, email});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})

// ✅ GET /user/:user_id/posts
userRoutes.get('/:user_id/posts', (req, res) => {
    const {user_id} = req.params;

    userService.readPost(user_id)
        .then(data => {
            res.json({data});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})


// ✅ GET /user/:user_id/posts/:post_id
userRoutes.get('/:user_id/posts/:post_id', (req, res) => {
    const { user_id, post_id } = req.params;

    userService.readPost(user_id, post_id)
        .then(data => {
            res.json({data});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})

// ✅ GET /user/:user_id/comments
userRoutes.get('/:user_id/comments', (req, res) => {
    const { user_id } = req.params;

    userService.readComment(user_id)
        .then(data => {
            res.json({data});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})

// ✅ GET /user/:user_id/comments/:comment_id
userRoutes.get('/:user_id/comments/:comment_id', (req, res) => {
    const {user_id, comment_id} = req.params;

    userService.readComment(user_id, comment_id)
        .then(data => {
            res.json({data});
        })
        .catch(err => {
            res.status(404)
            res.json(err.toString());
        })
})

// ✅ POST /user/login
userRoutes.post('/login', (req, res) => {
    res.json({});

    //userService.readUser(username)
    //     .then(user => {

    //         if (!user) {
    //             throw new Error(`Username ${username} does not exist.`)
    //         }

    //         return { match: bcrypt.compare(password, user.password), user: user }
    //     })
    //     .then(result => {
    //         if (!result.match) throw new Error(`The password didn't match.`)

    //         const token = uuidv1();
    //         const newUser = result.user;
    //         newUser.token = token;

    //         UserService.updateUser(username, newUser);

    //         res.json({
    //             status: 'Successful',
    //             token: token
    //         });
    //     })
    //     .catch(err => {
    //         res.status(400).json({ error: err.toString() })
    //     })
})



//PRIVATE USER ROUTES
// ❌ PUT /user/:user_id
userRoutes.put('/:user_id', (req, res) => {
    const { user_id }  = req.params;
    const { name, email } = req.body;

    userService.update(id, name, email)
    .then(() => {
        res.json({success:'lol u did it!'})
    })
    .catch(err => {
        // res.json('Error', err.toString());
    })


})

// ❌ DEL /user/:user_id
userRoutes.delete('/:user_id', (req, res) => {
    const {id} = req.params;

    userService.delete(id)
        .then(() => {
            res.json({success: 'Deleted User', name, email});
        })
        .catch(err => {
            res.json(err.toString());
        })
})

module.exports = userRoutes;


// IDEAS:
userRoutes.put(checkToken, '/user', (req, res) => {

});

// a auth token is best to passed by header 
const isLoggedIn = (req, res, next) => {
    if(req.header.token) next();
    else res.json("Error: You're not logged in.")
}

const isCorrectUser = (req, res, next) => {
    const { id } = req.params;
    const user = getUserFromDB(id);

    if(req.header.token === user.token) next ();
    else res.json('Error: Wrong Password.')
}
