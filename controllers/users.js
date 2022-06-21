const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

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
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        return res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные в методы поиска пользователя'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
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
        next(new ValidationError('Переданы некорректные данные в методы создания пользователя'));
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
      if (err.name === 'CastError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные в методы обновления профиля пользователя'));
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
      if (err.name === 'CastError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара пользователя'));
      } else {
        next(err);
      }
    });
};
