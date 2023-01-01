import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { sleep } from './utils/delay';
// import { CityType } from './gql/gqlOperations';

const delay = setContext(() => sleep(500));
// const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });
const httpLink = new HttpLink({ uri: 'https://j9zpu0-4000.preview.csb.app/' });

const client = new ApolloClient({
  link: ApolloLink.from([delay, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
