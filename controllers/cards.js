const Card = require('../models/card');
const { errorsHandler } = require('../errors/ErrorHandler');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.likeCard = (req, res) => {
  Card.findOneAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } })
    .then((card) => res.send(card))
    .catch((err) => { errorsHandler(err, res); });
};

module.exports.dislikeCard = (req, res) => {
  Card.findOneAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } })
    .then((card) => res.send(card))
    .catch((err) => { errorsHandler(err, res); });
};
