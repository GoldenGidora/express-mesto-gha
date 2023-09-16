const User = require('../models/user');
const { errorsHandler } = require('../errors/ErrorHandler');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        errorsHandler(err, res);
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => { errorsHandler(err, res); });
};
