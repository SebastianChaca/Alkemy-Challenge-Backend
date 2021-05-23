const jwt = require('jsonwebtoken');

const createToken = (user, secretKey, expiresIn) => {
  const { id, name, lastName, email } = user;
  return jwt.sign({ id, name, lastName, email }, secretKey, { expiresIn });
};

module.exports = createToken;
