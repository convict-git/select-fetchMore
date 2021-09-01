import { useQueryGetCityList } from '../gql/gqlOperations';
import React from 'react';

const Window = (): JSX.Element => {
  const { data, loading, error, loadMore } = useQueryGetCityList();

  if (error) {
    return <div>Error caught: {error.message}</div>;
  }

  const onScrollHandler = (e: any) => {
    if (
      e.target.offsetHeight + e.target.scrollTop + 200 >=
      e.target.scrollHeight
    ) {
      loadMore();
    }
  };

  return (
    <React.Fragment>
      <div className="loader">{loading ? 'Loading...' : 'Done'}</div>
      <div className="window" onScroll={onScrollHandler}>
        <ul>
          {data?.map((city) => (
            <li key={`${city.lat},${city.lng}`}>
              {city.name} {city.country}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export { Window };
