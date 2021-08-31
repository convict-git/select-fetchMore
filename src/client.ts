import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { sleep } from './utils/delay';

const delay = setContext(() => sleep(500));
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });

const client = new ApolloClient({
  link: ApolloLink.from([delay, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
