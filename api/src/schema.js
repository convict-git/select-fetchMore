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
  
  type GetCitiesResponse {
    data: [City]
    hasMore: Boolean!
  }

  type Query {
    getCities(input: GetCityInput): GetCitiesResponse
  }
`;

module.exports = typeDefs;
