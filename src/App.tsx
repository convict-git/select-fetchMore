import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style.css';
import { Main } from './components/Main';

export const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </React.Fragment>
  );
};
