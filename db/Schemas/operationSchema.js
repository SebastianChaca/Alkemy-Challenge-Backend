const { gql } = require('apollo-server');

const typeDefs = gql`
  type Operation {
    id: ID
    amount: Float
    concept: String
    type: String
    createdAt: String
    category: String
    user: ID
  }
  input OperationInput {
    concept: String!
    amount: Float!
    type: String!
    category: String!
  }
  input OperationUpdate {
    concept: String!
    amount: Float!
    category: String!
  }
  type Mutation {
    newOperation(input: OperationInput): Operation
    updateOperation(id: ID!, input: OperationUpdate): Operation
    deleteOperation(id: ID!): String
  }
  type Query {
    getUserOperations: [Operation]
    getOperationById(id: ID!): [Operation]
  }
`;
module.exports = typeDefs;
