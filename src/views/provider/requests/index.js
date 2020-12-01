import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const RequestsListPage = React.lazy(() => import('./RequestsListPage'));

const Pages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/`}
        exact
        render={(props) => <RequestsListPage {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Pages;
