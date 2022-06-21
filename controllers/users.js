const User = require('../models/user');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({
          message: 'Пользователь не существует',
        });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы поиска пользователя',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Пользователь не найден',
        });
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы создания пользователя',
        });
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы обновления профиля пользователя',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Пользователь не найден',
        });
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((updateAvatar) => res.status(200).send(updateAvatar))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные в методы обновления аватара пользователя',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND).send({
          message: 'Пользователь не найден',
        });
      } else {
        next(err);
      }
    });
};
