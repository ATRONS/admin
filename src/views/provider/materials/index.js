import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MaterialsListing = React.lazy(() => import('./MaterialListPage'));
const MaterialDetails = React.lazy(() =>
  import('../../common/MaterialDetails')
);

const Pages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}`}
        exact
        render={(props) => <MaterialsListing {...props} />}
      />
      <Route
        path={`${match.url}/:id`}
        exact
        render={(props) => <MaterialDetails {...props} />}
      />
      {/* <Redirect to="/error" /> */}
    </Switch>
  </Suspense>
);
export default Pages;
