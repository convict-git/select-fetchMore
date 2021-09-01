- This contains the read-only server to practice offset-based pagination using Apollo GraphQL.

- How to run?

  ```npm
  npm install
  npm run server
  ```

- I took the [US City list](https://github.com/kentcdodds/react-performance/blob/main/src/us-cities.json) and added ID's using `nanoid()`.

- Here's the schema

  ```gql
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
  ```

- Test with this query on playground

  ```js
  query ExampleQuery($input: GetCityInput) {
   getCities(input: $input) {
      id
      name
      country
      lat
      lng
   }
  }

  ```

  ```js
  // variables
  { "input": { "offset": 0, "limit": 100 }
  ```
