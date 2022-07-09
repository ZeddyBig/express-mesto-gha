const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const BadRequestError = require('../errors/BadRequestError');

const isUrlValid = (url) => {
  if (!isURL(url)) {
    throw new BadRequestError('Введена некорректная ссылка');
  }
  return url;
};

module.exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().allow('').min(2).max(30),
    about: Joi.string().allow('').min(2).max(30),
    avatar: Joi.string().allow('').custom(isUrlValid),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object({
    userId: Joi.string().hex().length(24),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(isUrlValid),
  }),
});

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(isUrlValid).required(),
  }),
});

module.exports.cardIdValidation = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
});
