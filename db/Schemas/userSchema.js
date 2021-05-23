const { gql } = require('apollo-server');
const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    password: String
    createdAt: String
  }
  type Token {
    token: String
    name: String
    id: ID
  }
  input UserInput {
    name: String!
    lastName: String!
    password: String!
    email: String!
  }
  input AuthInput {
    email: String!
    password: String!
  }
  extend type Mutation {
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token
  }
  extend type Query {
    getUser(token: String!): User
  }
`;
module.exports = typeDefs;
