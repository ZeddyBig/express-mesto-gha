const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signInValidation, signUpValidation } = require('./middlewares/joiValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const options = {
  origin: [
    'http://localhost:3000',
    'http://zeddybig.sprint15.nomoredomains.xyz',
    'https://zeddybig.sprint15.nomoredomains.xyz',
    'http://api.zeddybig.sprint15.nomoredomains.xyz',
    'https://api.zeddybig.sprint15.nomoredomains.xyz',
    'https://github.com/ZeddyBig',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};

const { PORT = 3001 } = process.env;
const app = express();
app.use('*', cors(options));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post('/signup', signUpValidation, createUser);
app.post('/signin', signInValidation, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {});
