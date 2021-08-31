const { gql } = require('apollo-server');

const typeDefs = gql`
  type City {
    id: ID!
    country: String!
    name: String!
    lat: Float!
    lng: Float!
  }

  input GetCityInput {
    offset: Int!
    limit: Int!
  }

  type Query {
    getCities(input: GetCityInput): [City]!
  }
`;

module.exports = typeDefs;
