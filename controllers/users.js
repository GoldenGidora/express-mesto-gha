const User = require('../models/user');
const { errorsHandler } = require('../errors/ErrorHandler');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.getUserById = (req, res) => {
  User.find({ _id: req.params.userId })
    .then((users) => res.send(users))
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(req.user._id, { name, about })
    .then((user) => res.send(user))
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate(req.user._id, { avatar })
    .then((user) => res.send(user))
    .catch((err) => { errorsHandler(err, res); });
};
