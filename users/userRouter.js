const express = require('express'); 
const protected = require('./protected-middleware');
const bcrypt = require('bcryptjs');

const Users = require('./user-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("WebAuth I Challenge Accepted!");
})

router.post('/register', (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users.add(user)
      .then(saved => {
          res.status(201).json(saved);
      })
      .catch(err => {
          res.status(500).json(error);
      });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        Users.findBy({ username })
          .first()
          .then(user => {
              if(user && bcrypt.compareSync(password, user.password)) {
                  res.status(200).json({ message: `Welcome, ${user.username}`});
              } else {
                  res.status(401).json({ message: 'Invalid Username/Password'});
              }
          })
          .catch(err => {
              res.status(500).json(err);
          });
    } else {
        res.status(400).json({ message: 'User/Pass Required'})
    }
});

router.get('/users', protected, (req, res) => {
    Users.find()
      .then(users => {
          res.json(users);
      })
      .catch(err => {
          res.status(500).json(err)
      });

});

module.exports = router;