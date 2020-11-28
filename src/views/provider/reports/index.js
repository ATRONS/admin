import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const EarningsByMaterial = React.lazy(() => import('./EarningsByMaterial'));
const TransactionHistory = React.lazy(() => import('./TransactionHistory'));
const MyReports = React.lazy(() => import('./MyReports'));

const Pages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/earning_by_material`}
        exact
        render={(props) => <EarningsByMaterial {...props} />}
      />
      <Route
        path={`${match.url}/my-reports`}
        exact
        render={(props) => <MyReports {...props} />}
      />

      <Route
        path={`${match.url}/transactions`}
        exact
        render={(props) => <TransactionHistory {...props} />}
      />

      {/* <Redirect to="/error" /> */}
    </Switch>
  </Suspense>
);
export default Pages;
