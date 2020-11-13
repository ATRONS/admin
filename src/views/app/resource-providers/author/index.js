import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AuthorListPages = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './authors')
);
const AuthorProfile = React.lazy(() =>
  import(/* webpackChunkName: "pages-profile" */ './AuthorProfile')
);

const Pages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/`} /> */}
      <Route
        path={`${match.url}/`}
        exact
        render={(props) => <AuthorListPages {...props} />}
      />
      <Route
        path={`${match.url}/:id`}
        exact
        render={(props) => <AuthorProfile {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Pages;
