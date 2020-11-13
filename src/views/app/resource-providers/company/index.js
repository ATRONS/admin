import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CompaniesListPages = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './companies')
);
const CompanyProfile = React.lazy(() =>
  import(/* webpackChunkName: "pages-profile" */ './CompanyProfile')
);

const Pages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/`} /> */}
      <Route
        path={`${match.url}/`}
        exact
        render={(props) => <CompaniesListPages {...props} />}
      />
      <Route
        path={`${match.url}/:id`}
        exact
        render={(props) => <CompanyProfile {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Pages;
