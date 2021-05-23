const { ApolloServer } = require('apollo-server');
const _ = require('lodash');
const userResolver = require('./db/Resolvers/userResolver');
const operationResolver = require('./db/Resolvers/operationResolver');
const userSchema = require('./db/Schemas/userSchema');
const operationSchema = require('./db/Schemas/operationSchema');
const getUser = require('./db/AuthUsers/getUser');

const conectarDB = require('./config/config');
conectarDB();
const server = new ApolloServer({
  typeDefs: [userSchema, operationSchema],
  resolvers: _.merge({}, userResolver, operationResolver),
  context: ({ req }) => {
    const token = req.headers['authorization'] || '';

    const user = getUser(token);
    return user;
  },
});

server.listen({ port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`Servidor listo en la URL ${url}`);
});
