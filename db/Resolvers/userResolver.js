const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
const createToken = require('../AuthUsers/createToken');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const resolvers = {
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;
      const existeUsuario = await User.findOne({ email });
      if (existeUsuario) {
        throw new Error('El usuario ya existe');
      }

      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      try {
        const user = new User(input);
        user.save();
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    authUser: async (_, { input }) => {
      const { email, password } = input;
      const userExist = await User.findOne({ email });

      if (!userExist) {
        throw new Error('El usuario no existe');
      }
      const validatePassword = await bcryptjs.compare(
        password,
        userExist.password
      );
      if (!validatePassword) {
        throw new Error('El password es incorrecto');
      }
      const { name, id } = userExist;
      return {
        token: createToken(userExist, process.env.SECRETA, '24h'),
        name,
        id,
      };
    },
  },
  Query: {
    getUser: async (_, { token }) => {
      const userId = await jwt.verify(token, process.env.SECRETA);
      return userId;
    },
  },
};
module.exports = resolvers;
