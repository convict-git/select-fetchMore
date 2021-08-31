/* This is going to be the entry point for the project */

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ApolloProvider } from '@apollo/client';
import client from './client';

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
ReactDOM.render(<Root />, document.getElementById('root'));
