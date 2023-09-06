const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.find({ _id: req.params.cardId })
    .then((card) => res.send(card))
    .catch(next);
};
