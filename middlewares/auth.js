const { checkToken } = require('../helpers/jwt');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new UnauthorizedError('Авторизуйтесь для доступа');
  }
  const token = auth.replace('Bearer ', '');
  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    next(new UnauthorizedError('Авторизуйтесь для доступа'));
  }

  req.user = payload;
  next();
};
