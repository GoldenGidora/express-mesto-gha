const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.find(req.params.userId)
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about } = req.body;

  User.create({ name, about })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
