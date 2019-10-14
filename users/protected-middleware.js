const bcrypt = require('bcryptjs');
const Users = require('./user-model.js');

module.exports = protected

function protected(req, res, next) {
    const { username, password } = req.headers;

    if (username && password) {
        Users.findBy({ username })
          .first()
          .then(user => {
              if (user && bcrypt.compareSync(password, user.password)){
                  next();
              } else {
                  res.status(401).json({ message: 'invalid credentials submitted' })
              }
          })
          .catch(err => {
              res.status(500).json({ message: 'unexpected error'})
          })
    } else {
        res.status(400).json({ message: 'no credentials submitted' })
    }
}