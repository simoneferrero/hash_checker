/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import Header from 'components/Header';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import styles from './styles.css';

export default function App() {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <ReduxToastr
          timeOut={4000}
          position="bottom-center"
        />
      </div>
    </div>
  );
}
