import { gql } from 'graphql-tag';

const GET_CITY_LIST = gql`
  query GetCityList($input: GetCityInput) {
    getCities(input: $input) {
      id
      name
      country
      lat
      lng
    }
  }
`;
export { GET_CITY_LIST };
