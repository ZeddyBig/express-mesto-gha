// eslint-disable-next-line no-multiple-empty-lines
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signInValidation, signUpValidation } = require('./middlewares/joiValidation');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signup', signUpValidation, createUser);
app.post('/signin', signInValidation, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  if (err.statusCode === 500) {
    res.status(err.statusCode).send({ message: 'Ошибка по умолчанию' });
  } else {
    next(err);
  }
});

app.listen(PORT, () => {});
