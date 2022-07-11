const { celebrate, Joi } = require('celebrate');

module.exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/w?w?w?.?\w+\W+(.\w+\W+)?(.\w+\W+)?(.\w+\W+)?(.\w+\W+)?(.\w+\W+)?/),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/w?w?w?.?\w+\W+(.\w+\W+)?(.\w+\W+)?(.\w+\W+)?(.\w+\W+)?(.\w+\W+)?/),
  }),
});

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/https?:\/\/w?w?w?.?\w+\W+(.\w+\W+)?(.\w+\W+)?(.\w+\W+)?(.\w+\W+)?(.\w+\W+)?/),
  }),
});

module.exports.cardIdValidation = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
