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

const LIST_FETCH_SIZE = 20;

const useQueryGetCityList = () => {
  const [length, setLength] = React.useState<number>(0);
  const [isFetchingMore, setIsFetchingMore] = React.useState<boolean>(false);

  const { loading, data, error, fetchMore } = useQuery<ResultType>(
    GET_CITY_LIST,
    {
      variables: {
        input: {
          offset: 0,
          limit: length + LIST_FETCH_SIZE,
        },
      },
    }
  );

  const loadMore = () => {
    if (data && !isFetchingMore) {
      setIsFetchingMore(true);
      const currentLength = data.getCities.length;
      fetchMore({
        variables: {
          offset: currentLength,
          limit: LIST_FETCH_SIZE,
        },
      }).then((fetchMoreResult) => {
        setLength(currentLength + fetchMoreResult.data.getCities.length);
        setIsFetchingMore(false);
      });
    }
  };

  return { data: data?.getCities, loading, error, loadMore, isFetchingMore };
};

export { GET_CITY_LIST, useQueryGetCityList };
export type { CityType };
