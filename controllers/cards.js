const Card = require('../models/card');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы создания карточки',
        });
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({
          message: 'Карточка не существует',
        });
        return;
      }
      res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы удаления карточки',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Карточка не найдена',
        });
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({
          message: 'Карточка не существует',
        });
        return;
      }
      res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные для установки лайка',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Карточка не найдена',
        });
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({
          message: 'Карточка не существует',
        });
        return;
      }
      res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные для удаления лайка',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Карточка не найдена',
        });
      } else {
        next(err);
      }
    });
};
