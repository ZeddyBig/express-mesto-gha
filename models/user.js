// eslint-disable-next-line no-multiple-empty-lines
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (link) => isURL(link),
      message: 'Введена некорректная ссылка',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    requied: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Введен некорректный Email',
    },
  },
  password: {
    type: String,
    requied: true,
    minlength: 4,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
