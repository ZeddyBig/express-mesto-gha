// eslint-disable-next-line no-multiple-empty-lines
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62b0972400346458f291c415',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((err, req, res, next) => {
  if (err.statusCode === 500) {
    res.status(err.statusCode).send({ 'Ошибка на сервере': err.message });
  } else {
    next(err);
  }
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
