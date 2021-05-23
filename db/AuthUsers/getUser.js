const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const getUser = (token) => {
  if (token) {
    const user = jwt.verify(token, process.env.SECRETA);
    if (!user) {
      throw new Error('Usuario no verificado');
    } else {
      return { user };
    }
  }
};
module.exports = getUser;
