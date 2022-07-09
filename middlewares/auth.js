const { checkToken } = require('../helpers/jwt');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new UnauthorizedError('Вы не авторизованы');
  }
  const token = auth.replace('Bearer ', '');
  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    next(new UnauthorizedError('Вы не авторизованы'));
  }

  req.user = payload;
  next();
};
