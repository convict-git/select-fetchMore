import React from 'react';
import { gql } from 'graphql-tag';
import { useQuery } from '@apollo/client';

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

interface CityType {
  id: string;
  country: string;
  name: string;
  lat: number;
  lng: number;
}

interface ResultType {
  getCities: CityType[];
}

const LIST_FETCH_SIZE = 10;

const useQueryGetCityList = () => {
  const [limit, setLimit] = React.useState<number>(LIST_FETCH_SIZE);
  const { loading, data, error, fetchMore } = useQuery<ResultType>(
    GET_CITY_LIST,
    {
      variables: {
        input: {
          offset: 0,
          limit,
        },
      },
    }
  );

  const loadMore = () => {
    console.log('loadMore Called()');
    if (data) {
      const currentLength = data.getCities.length;
      fetchMore({
        variables: {
          offset: currentLength,
          limit: LIST_FETCH_SIZE,
        },
      }).then((fetchMoreResult) => {
        setLimit(currentLength + fetchMoreResult.data.getCities.length);
      });
    }
  };

  return { data: data?.getCities, loading, error, loadMore };
};

export { GET_CITY_LIST, useQueryGetCityList };
export type { CityType };
