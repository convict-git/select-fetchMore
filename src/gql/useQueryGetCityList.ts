import { useCallback, useRef } from 'react';
import { gql } from 'graphql-tag';
import { useQuery, NetworkStatus } from '@apollo/client';

const GET_CITY_LIST = gql`
  query GetCityList($input: GetCityInput) {
    getCities(input: $input) {
      data {
        id
        name
        country
        lat
        lng
      }
      hasMore
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
  getCities: {
    data: CityType[];
    hasMore: boolean;
  };
}

const LIST_FETCH_SIZE = 20;

const useQueryGetCityList = () => {
  const {
    loading,
    data,
    error,
    fetchMore: _fetchMore,
    networkStatus,
  } = useQuery<ResultType>(GET_CITY_LIST, {
    variables: {
      input: {
        offset: 0,
        limit: LIST_FETCH_SIZE,
      },
    },
  });

  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;
  const lastCurrentLengthRef = useRef(0);

  const fetchMore = useCallback(() => {
    const currentLength = data?.getCities?.data?.length ?? 0;
    if (
      data &&
      data?.getCities.hasMore &&
      !isFetchingMore &&
      !loading &&
      lastCurrentLengthRef.current !== currentLength
    ) {
      lastCurrentLengthRef.current = currentLength;
      _fetchMore({
        variables: {
          input: {
            offset: currentLength,
            limit: LIST_FETCH_SIZE,
          },
        },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          return {
            ...previousQueryResult,
            getCities: {
              data:
                fetchMoreResult?.getCities?.data &&
                previousQueryResult.getCities?.data
                  ? [
                      ...previousQueryResult.getCities.data,
                      ...fetchMoreResult.getCities.data,
                    ]
                  : previousQueryResult.getCities,
              hasMore: !!(
                fetchMoreResult?.getCities?.hasMore ||
                fetchMoreResult.getCities?.hasMore
              ),
            },
          };
        },
      });
    }
  }, [data, _fetchMore, isFetchingMore]);

  return {
    data: data?.getCities.data,
    loading,
    error,
    fetchMore,
    isFetchingMore,
  };
};

export { GET_CITY_LIST, useQueryGetCityList };
export type { CityType };
