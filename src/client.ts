import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { sleep } from './utils/delay';
import { offsetLimitPagination } from '@apollo/client/utilities';
// import { CityType } from './gql/gqlOperations';

const delay = setContext(() => sleep(500));
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });
// const httpLink = new HttpLink({ uri: 'https://tnf0m.sse.codesandbox.io/' });

const client = new ApolloClient({
  link: ApolloLink.from([delay, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getCities: offsetLimitPagination(),
        },
      },
    },
  }),
});

export default client;
