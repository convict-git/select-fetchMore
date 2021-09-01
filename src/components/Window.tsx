import { useQueryGetCityList } from '../gql/useQueryGetCityList';
import React from 'react';

const Window = (): JSX.Element => {
  const { data, loading, error, loadMore, isFetchingMore } =
    useQueryGetCityList();

  if (error) {
    return <div>Error caught: {error.message}</div>;
  }

  const onScrollHandler = (e: any) => {
    if (
      e.target.offsetHeight + e.target.scrollTop + 400 >=
      e.target.scrollHeight
    ) {
      loadMore();
    }
  };

  return (
    <React.Fragment>
      <div className="window" onScroll={onScrollHandler}>
        <ul>
          {data?.map((city) => (
            <li key={`${city.lat},${city.lng}`}>
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
        <code className="loader">
          {loading || isFetchingMore ? 'Loading...' : ''}
        </code>
      </div>
    </React.Fragment>
  );
};

export { Window };
